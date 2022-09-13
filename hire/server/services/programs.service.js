const env = process.env.NODE_ENV;
const moment = require("moment");
const keys = require('../config/keys');
const programsRepository = require("../repositories/programs.repository");
const rolesRepository = require("../repositories/roles.repository");
const testRepository = require("../repositories/test.repository");
const ognRepository = require("../repositories/ogn.repository");
const { decryptCode } = require("../utils/helper");
const { toFixed } = require("../utils/common");

const superCollection = keys.superCollection[env];

const getPrograms = async (params) => {
    try {
        const { email } = params;
        const applications = await programsRepository.getApplications(params);
        if(applications.length) {
            // Get organizations
            const organizations = await ognRepository.getOrganizations();
            // Get Quizzes Organizations
            const quizzesOrganizations = await ognRepository.getQuizzesOrganizations();
            // Get the application batch_id's
            const batchIds = applications.map(application => application.batch_id);
            // Fetch batches with batch_id's
            const batches = await rolesRepository.getBatchesByIds(batchIds);
            // Get the test_id's from the batches'
            const assignedTestIds = batches.reduce((accumulator, batch) => ([
                ...accumulator,
                ...batch.rounds.filter(round =>
                    [1, 2].includes(round.type) && round.test_id
                ).map(round => round.test_id)
            ]), []);
            // Fetch user documents from all the quizzes domains
            const quizzesUsers = await testRepository.getQuizzesUsers(params);
            // Get user_id's from user docs
            const userIds = quizzesUsers.map(user => user.uid);
            // Reduce user group_ids
            const groups = quizzesUsers.reduce((acc, user) => {
                if(user.group) {
                    return [
                        ...acc,
                        ...user.group.map(groupId => parseInt(groupId))
                    ];
                }
                return acc;
            }, []);
            // Fetch assignments with group_ids
            const assignments = await testRepository.getAssignments(groups);
            // Reduce assignment instance_id's
            const assignedInstanceIds = assignments.reduce((acc, assignment) => {
                if(assignedTestIds.includes(decryptCode(assignment.test_id))) {
                    return [
                        ...acc,
                        decryptCode(assignment.instance_id)
                    ];
                }
                return acc;
            }, []);
            // Fetch instances with instance_ids
            const instances = await testRepository.getInstances(assignedInstanceIds);
            // Fetch reports with instance and user ids
            const reports = await testRepository.getReports(assignedInstanceIds, userIds);
            // Fetch report logs with instance and user ids
            const reportLogs = await testRepository.getReportLogs(assignedInstanceIds, userIds);
            // Fetch typeform logs
            const typeformLogs = await programsRepository.getTypeFormLogs({
                email,
                batch_ids: batchIds
            });
            // Fetch notes
            const notes = await programsRepository.getNotes({
                email,
                batch_ids: batchIds
            });

            // Get current time
            const currentTime = moment().utcOffset("+05:30").unix();
            
            const programs = applications.sort((a, b) => 
                b.applied_at - a.applied_at
            ).map(application => {
                let program = {
                    program_name: application.program,
                    rounds: [
                        {
                            name: "Application",
                            status: 1
                        }
                    ],
                    progress: 1,
                    status: 1
                }

                let quizzesOid;
                const organization = organizations.find(organization => 
                    organization.id === application.o_id
                );
                if(organization) {
                    quizzesOrganizations.forEach(quizzesOrganization => {
                        if(organization.domain === quizzesOrganization.domain) {
                            quizzesOid = quizzesOrganization.id;
                        }
                    });
                }

                let batch = batches.find(batch => 
                    batch.batch_id === application.batch_id
                );

                batch.rounds.forEach((round, key) => {
                    let score = 0;
                    let status = 0;
                    let hasAttempted = false;
                    let instanceInfo = {};

                    if(round.type === 1 || round.type === 2) {
                        let instance = instances.sort((a, b) => 
                            b.settings.start_date - a.settings.start_date
                        ).find(instance => 
                            instance.test_id === round.test_id &&
                            instance.instance_author_ref === quizzesOid
                        );

                        if(instance) {
                            // Check if the user has taken the test.
                            let report = reports.find(report => 
                                report.instance_id === instance.instance_id
                            );

                            if(round.type === 1) {
                                if(!report && (instance.is_global || instance.author_ref === superCollection)) {
                                    // Logic to check if test is global and already cleared.
                                    report = reports.find(report => 
                                        report.test_id === instance.test_id &&
                                        toFixed((report.total_score/report.total_possible_score) * 100) >= round.cutoff
                                    );
                                }
                            } else {
                                // Check if score is below cutoff
                                if(report && round.result && toFixed((report.total_score/report.total_possible_score) * 100) < round.cutoff) {
                                    // Check if manual evaluation completed
                                    let reportLog = reportLogs.find(reportLog => 
                                        reportLog.instance_id === report.instance_id &&
                                        reportLog.uid === report.uid
                                    );
                                    // If manual evaluation not completed, disable result
                                    if(!reportLog) {
                                        round.result = 0;
                                    }
                                }
                            }

                            instanceInfo = {
                                o_id: instance.instance_author_ref,
                                test_id: instance.test_id,
                                instance_id: instance.instance_id,
                                start_date: instance.settings.start_date,
                                end_date: instance.settings.end_date
                            }
                            if(report) {
                                hasAttempted = true;
                                // Get the report with highest score
                                report = reports.sort((a, b) => 
                                    b.total_score - a.total_score
                                ).find(report => 
                                    report.test_id === instance.test_id
                                );
                                score = toFixed((report.total_score/report.total_possible_score) * 100);
                            }
                        }
                    } else if(round.type === 3) {
                        let typeformLog = typeformLogs.find(typeformLog => 
                            typeformLog.batch_id === batch.batch_id
                        );

                        if(typeformLog) {
                            hasAttempted = true;
                            score = typeformLog.score;
                        }
                    } else if (round.type === 4) {
                        let note = notes.find(note => 
                            note.batch_id === batch.batch_id
                        );
                        if(note) {
                            hasAttempted = true;
                            score = note.score;
                        }
                    }

                    if(!hasAttempted) {
                        if(instanceInfo.start_date && instanceInfo.end_date) {
                            if(instanceInfo.start_date > currentTime) {
                                status = 3 // Scheduled
                            } else if(instanceInfo.end_date >= currentTime) {
                                status = 0; // Not yet attempted
                            } else {
                                status = 2; // Rejected
                                program.status = 0;
                            }
                        } else {
                            status = 0;
                        }
                    } else if(hasAttempted) {
                        if(score >= round.cutoff) {
                            status = 1; // Selected
                            program.progress += 1;
                        } else if(round.result) {
                            status = 2; // Rejected
                            program.status = 0;
                        } else {
                            status = 4; // Under Review (TBU)
                        }
                    }
                    
                    program.rounds.push({
                        id: round.id,
                        type: round.type,
                        name: round.name,
                        result: round.result,
                        status,
                        ...instanceInfo
                    });
                });
                
                return program;
            });

            return { 
                status: 1, 
                message: "Programs fetched successfully", 
                programs
            }
        }
        return { status: 0, message: "Failed to retrieve programs" };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    getPrograms
}