const reportsRepository = require("../repositories/reports.repository");
const rolesRepository = require("../repositories/roles.repository");
const ognRepository = require("../repositories/ogn.repository");
const usersRepository = require("../repositories/users.repository");
const notesRepository = require("../repositories/notes.repository");
const { toFixed } = require("../utils/common");
const { createQuizzesJWT } = require("../utils/jwt");
const { encryptCode, encryptContent } = require("../utils/helper");
const keys = require('../config/keys');
const env = process.env.NODE_ENV;

const superCollection = keys.superCollection[env];

const getReports = async (params) => {
    try {
        // Fetch applicants
        const applications = await reportsRepository.getApplications(params);
        const applicantUids = [...new Set([
            ...applications.map(application => application.uid)
        ])];
        // Get applicant profiles
        let profiles = await reportsRepository.getProfiles(applicantUids);
        profiles = profiles.map(profile => ({
            uid: profile.uid,
            name: profile.firstName + " " + profile.lastName,
            yop: profile.pgYop ? profile.pgYop : profile.yop,
            email: profile.email,
            gender: profile.gender,
            clgState: profile.clgState ? profile.clgState : " ",
            college: profile.college ? profile.college : " ",
            state: profile.state ? profile.state : " ",
            degree: profile.degree,
            linkedin: profile.linkedin ? profile.linkedin : " ",
            mobileNumber: profile.mobileNumber ? profile.mobileNumber : " ",
            percentage: profile.percentage ? profile.percentage : " ",
            department: profile.pgStream ? profile.pgStream : profile.stream,
            resume: profile.resume,
            preferred_language: profile.preferred_language
        }));

        const applicantEmails = applications.map((applicant) => applicant.email);
        let rounds = 0;
        let reports = [];

        const batches = await rolesRepository.getBatches(params);
        const quizzesOrganizations = await ognRepository.getQuizzesOrganizations();

        if(quizzesOrganizations.length) {
            const assignedTestIds = batches.reduce((accumulator, batch) => ([
                ...accumulator,
                ...batch.rounds.filter(round =>
                    [1, 2].includes(round.type) && round.test_id
                ).map(round => round.test_id)
            ]), []);
            const testReports = await reportsRepository.getReports({
                test_ids: assignedTestIds
            });
            const typeformLogs = await reportsRepository.getTypeFormLogs(params);

            const notes = await notesRepository.getNotes(params);

            let quizzesUsers = await reportsRepository.getQuizzesUsersByEmails({
                applicant_emails: applicantEmails
            });

            batches.forEach(batch => {
                applications.forEach((applicant, key) => {
                    if(applicant.batch_id === batch.batch_id) {
                        // Logic to find the largest no of rounds among batches
                        if(batch.rounds.length > rounds) {
                            rounds = batch.rounds.length;
                        }
                        let profile = profiles.find(profile => profile.uid === applicant.uid);
                        let quizzesUserUids = quizzesUsers.filter(quizzesUser => 
                            quizzesUser.email === applicant.email
                        ).map(quizzesUser => quizzesUser.uid);

                        if(profile) {
                            batch.rounds.forEach((round, key) => {
                                if([1,2].includes(round.type)) {
                                    const report = testReports.find(report => 
                                        round.test_id === report.test_id &&
                                        quizzesUserUids.includes(report.uid)
                                    );
                                    let score = 0;
                                    if(report) {
                                        score = toFixed((report.total_score/report.total_possible_score) * 100);
                                        profile["round_" + (key + 1) + "_score"] = score;
                                        profile["round_" + (key + 1) + "_report"] = {
                                            attempt: report.attempt,
                                            instance_id: report.instance_id,
                                            test_id: report.test_id,
                                            user_id: report.uid,
                                            o_id: report.o_id,
                                            type: 1
                                        }
                                        profile["round_" + (key + 1) + "_status"] = score >= round.cutoff ? "Selected" : "Not Selected";
                                    }
                                } else if(round.type === 3) {
                                    const typeformLog = typeformLogs.find(log =>
                                        log.email === applicant.email &&
                                        log.batch_id === applicant.batch_id
                                    )
                                    
                                    if(typeformLog) {
                                        score = typeformLog.score;
                                        profile["round_" + (key + 1) + "_score"] = score;
                                        profile["round_" + (key + 1) + "_report"] = {
                                            recording: typeformLog.recording,
                                            remarks: typeformLog.remarks,
                                            type: 2
                                        }
                                        profile["round_" + (key + 1) + "_status"] = score >= round.cutoff ? "Selected" : "Not Selected";
                                    }
                                } else if (round.type === 4) {
                                    const note = notes.find(note => 
                                        note.email === applicant.email &&
                                        note.batch_id === applicant.batch_id
                                    );
                                    profile["round_" + (key + 1) + "_report"] = {
                                        o_id: batch.o_id,
                                        role_id: batch.role_id,
                                        batch_id: batch.batch_id,
                                        email: applicant.email,
                                        round: key + 1,
                                        type: 3
                                    }
                                    if(note) {
                                        score = note.score;
                                        profile["round_" + (key + 1) + "_score"] = score;
                                        profile["round_" + (key + 1) + "_status"] = score >= round.cutoff ? "Selected" : "Not Selected";
                                    }
                                }
                            });
                            reports.push({key, ...profile});
                        }
                    }
                });

            });
        }

        if(applications) {
            return { 
                status: 1, 
                message: "Reports fetched successfully", 
                reports,
                rounds
            }
        }
        return { status: 0, message: "Failed to fetch reports" }
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getProfile = async (params) => {
    try {
        const response = await reportsRepository.getProfile(params);
        if(response) {
            return { status: 1, message: "Profile retrieved successfully", profile: response }
        }
        return { status: 1, message: "Failed to retrieve profile" }
    } catch (err) {
        throw err;
    }
}

const getDetailedReport = async (params) => {
    try {
        const { domain, email, user_id } = params;
        const G_PORTAL_DOMAIN = keys.domainEnv[env].g_portal_domain;
        const response = await reportsRepository.getReport(params);
        if(response) {
            const quizzesOrganization = await ognRepository.getQuizzesOrganization(domain);
            const requester = await usersRepository.getQuizzesUserByEmail({
                email,
                o_id: quizzesOrganization.id
            });
            if(requester) {
                params.token = createQuizzesJWT({
                    ...requester,
                    domain: quizzesOrganization.domain,
                    organization_name: quizzesOrganization.name
                });
                const payloadEnc = encryptContent(JSON.stringify({
                    email: requester.email,
                    secondary_id: requester.o_id,
                    name: requester.name,
                    action_type: "reports",
                    access_type: requester.user_type,
                    upn: requester.uid,
                    action_data: {
                        instance_id: encryptCode(response.instance_id),
                        uid: user_id,
                        attempt: response.attempt,
                        r_url: `https://${ params.domain }${ G_PORTAL_DOMAIN }/students-table`
                    }
                }), keys.secret_key)
                const authToken = encryptContent(`${ params.token }_auth_${ parseInt(Date.now() / 1000) }`, keys.secret_key)
                return { status: 1, message: "Report details fetched successfully", payloadEnc, authToken }
            }
        }

        return { status: 0, message: "Failed to fetch report details" }
    } catch (err) {
        console.log(err);
        throw err; 
    }
}

const getOptions = async (params) => {
    try {
        const { o_id } = params;
        let roles;
        let batches = [];
        let organizations = [];
        if(o_id !== superCollection) {
            roles = await rolesRepository.getRoles(params);
        } else {
            roles = await rolesRepository.getAllRoles();
            batches = await rolesRepository.getAllBatches();
            organizations = await ognRepository.getOrganizations();
        }
        if(roles && roles.length) {
            return {
                status: 1,
                message: "Options retrieved successfully",
                roles,
                batches,
                organizations,
                role_id: roles[0].role_id
            }
        }
        return { status: 0, message: "Failed to retrieve options" }
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    getReports,
    getProfile,
    getDetailedReport,
    getOptions
}