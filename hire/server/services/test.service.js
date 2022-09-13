const moment = require("moment");
const ognRepository = require("../repositories/ogn.repository");
const rolesRepository = require("../repositories/roles.repository");
const testRepository = require("../repositories/test.repository");
const usersRepository = require("../repositories/users.repository");
const { createQuizzesJWT } = require("../utils/jwt");
const { encryptCode, encryptContent, decryptCode } = require("../utils/helper");
const { sendTestInviteMail } = require("../utils/templates");
const keys = require('../config/keys');
const env = process.env.NODE_ENV;

const getTests = async (params) => {
    try {
        const applications = await testRepository.getApplications(params);
        if(applications.length) {
            const batchIds = applications.map(application => application.batch_id);
            const batches = await rolesRepository.getBatchesByIds(batchIds);
            const assignedTestIds = batches.reduce((accumulator, batch) => ([
                ...accumulator,
                ...batch.rounds.filter(round =>
                    [1, 2].includes(round.type) && round.test_id
                ).map(round => round.test_id)
            ]), []);
            const quizzesUsers = await testRepository.getQuizzesUsers(params);
            const userIds = quizzesUsers.map(user => user.uid);
            const groups = quizzesUsers.reduce((acc, user) => {
                if(user.group) {
                    return [
                        ...acc,
                        ...user.group.map(groupId => parseInt(groupId))
                    ];
                }
                return acc;
            }, []);
            const assignments = await testRepository.getAssignments(groups);
            const assignedInstanceIds = assignments.reduce((acc, assignment) => {
                if(assignedTestIds.includes(decryptCode(assignment.test_id))) {
                    return [
                        ...acc,
                        decryptCode(assignment.instance_id)
                    ];
                }
                return acc;
            }, []);
            const instances = await testRepository.getInstances(assignedInstanceIds);
            const reports = await testRepository.getReports(assignedInstanceIds, userIds);
            const currentTime = moment().utcOffset("+05:30").unix();
            const tests = instances.map(instance => {
                const report = reports.find(report => 
                    report.instance_id === instance.instance_id
                );
                let round = 1;
                let program = instance.instance_name;
                let application;
                batches.forEach(batch => {
                    batch.rounds.forEach((round, key) => {
                        if([1, 2].includes(round.type) && round.test_id === instance.test_id) {
                            round = key + 1;
                            application = applications.find(application => 
                                application.batch_id === batch.batch_id
                            );
                            if(application && application.program) {
                                program = application.program;
                            }
                        }
                    })
                });

                let type = 0;
                let status = 0;
                if(report) {
                    type = 1;
                    status = 1;
                } else if(instance.settings.end_date !== -1 && 
                instance.settings.end_date <= currentTime) {
                    type = 1;
                } else if(instance.settings.start_date > currentTime) {
                    status = 1;
                }
                
                return {
                    instance_id: instance.instance_id,
                    test_id: instance.test_id,
                    title: program,
                    round: "Round " + round,
                    o_id: instance.author_ref,
                    duration: instance.duration,
                    start_date: instance.settings.start_date,
                    end_date: instance.settings.end_date,
                    type,
                    status
                }
            });

            const activeTests = tests.filter(test => 
                test.type === 0 && test.status === 0
            );

            const scheduledTests = tests.filter(test => 
                test.type === 0 && test.status === 1
            );

            const completedTests = tests.filter(test => 
                test.type === 1 && test.status === 1
            );

            const closedTests = tests.filter(test =>
                test.type === 1 && test.status === 0
            );

            return { 
                status: 1, 
                message: "Tests fetched successfully", 
                active_tests: activeTests, 
                scheduled_tests: scheduledTests, 
                completed_tests: completedTests, 
                closed_tests: closedTests
            };
        }

        if(applications) {
            return { 
                status: 1, 
                message: "Tests fetched successfully", 
                active_tests: [], 
                scheduled_tests: [], 
                completed_tests: [], 
                closed_tests: [] 
            }
        }

        return { status: 0, message: "Failed to fetch tests" };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const assignTest = async(params) => {
    try {
        const { o_id } = params;
        // Get organization details
        const organization = await ognRepository.getOrganizationById(o_id);
        if(organization) {
            const batch = await rolesRepository.getBatch(params);
            let testId = "", round="";
            // Get round one test id from the array of rounds
            if(batch){
                round = batch.rounds.find((_, type) => _.type === 1);
                if(!round){
                    round = batch.rounds.find((_, type) => _.type === 2);
                }
                testId = round ? round.test_id : "";
            }
            if(batch && testId) {
                // Get quizzes platform domain id
                const quizzesOrganization = await ognRepository.getQuizzesOrganization(organization.domain);
                if(quizzesOrganization) {
                    // Get an active instance based on the time window.
                    const instance = await testRepository.getActiveInstance({
                        test_id: testId,
                        domain: quizzesOrganization.id
                    });
                    if(instance) {
                        // Get all the assignments of the organization
                        const assignments = await testRepository.getOgnAssignments(quizzesOrganization.id);
                        // Find the assignment matching the instance id and test id
                        const assignment = assignments.find(assignment => 
                            decryptCode(assignment.instance_id) === instance.instance_id &&
                            decryptCode(assignment.test_id) === instance.test_id
                        );
        
                        if(!assignment) {
                            return { status: 0, message: "No matching assignment found!" };
                        } else if(!assignment.groups || !assignment.groups.length) {
                            return { status: 0, message: "Assignment found but no group attached!" };
                        } else {
                            params.group = assignment.groups[0];
                            // Attach assignment group and store user info
                            const user = await testRepository.inviteAndAssignTest({
                                ...params,
                                domain: quizzesOrganization.id
                            });
        
                            if(user) {
                                const G_PROGRAD_PORTAL = keys.domainEnv[env].g_prograd_portal;

                                const link = `${G_PROGRAD_PORTAL}jobsboard`;
                                // Send test invitation to students
                                sendTestInviteMail(user.email, user.name, link, "ProGrad", instance.instance_name);

                                return { status: 1, message: "Test assigned successfully!" }
                            }
                            return { status: 0, message: "Test already assigned to the user" };
                        } 
                    }
                    return { status: 0, message: "Requested test does not have any active instance!" };
                }
                return { status: 0, message: "Quizzes domain not found" };
            }
            return { 
                status: 0, 
                message: (batch ? "Round 1 test id" : "Batch") + " not found" 
            };
        }
        return { status: 0, message: "Organization not found" };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getTakeTest = async (params) => {
    try {
        const { instance_id, o_id } = params;
        const G_PROGRAD_PORTAL = keys.domainEnv[env].g_prograd_portal;
        // Get user groups
        const userDetails = await usersRepository.getQuizzesUserByEmail(params);
        const userGroups = userDetails.group != undefined ? userDetails.group.map(g => parseInt(g)) : [];
        // Fetch user assignments
        const assignments = await testRepository.getUserAssignments(userDetails.uid, o_id, userGroups);
        const instanceIds = assignments.map(assignment => decryptCode(assignment.instance_id));

        // Check if instance is assigned to user
        if (instanceIds.includes(instance_id)) {
            // Fetch instance details
            const inst = await testRepository.getInstanceById(instance_id);
            if (inst) {
                const quizzesOrganization = await ognRepository.getQuizzesOrganizationById(o_id);
                params.token = createQuizzesJWT({
                    ...userDetails,
                    domain: quizzesOrganization.domain,
                    organization_name: quizzesOrganization.name
                });
                const payloadEnc = encryptContent(JSON.stringify({
                    email: userDetails.email,
                    secondary_id: o_id,
                    name: userDetails.name,
                    action_type: "take-test",
                    access_type: 6,
                    upn: userDetails.uid,
                    action_data: {
                        instance_id: encryptCode(inst.instance_id),
                        r_url: `${G_PROGRAD_PORTAL}jobsboard/`
                    }
                }), keys.secret_key)
                const authToken = encryptContent(`${ params.token }_auth_${ parseInt(Date.now() / 1000) }`, keys.secret_key)

                return { status: 1, message: "Tests details fetched successfully", payloadEnc, authToken }
            } else {
                return { status: 0, message: "This test does not exist anymore" }
            }
        } else {
            return { status: 0, message: "You are not allowed to take this test" }
        }
    } catch (err) {
        console.log('Fetch student assignments error', params, err)
        throw err;
    }
}

module.exports = { getTests, getTakeTest, assignTest };