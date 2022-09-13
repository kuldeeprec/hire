const JobApplications = require("../models/prograd/jobApplications.model");
const ProgradUsers = require("../models/prograd/users.model");
const QuizzesUsers = require("../models/quizzes/users.model");
const { Reports } = require("../models/quizzes/reports.model");
const TypeformLogs = require("../models/typeformLogs.model");

const getApplications = async (params) => {
    try {
        const { o_id, role_id, batch_id, candidate_email } = params;
        return await JobApplications.find({
            ...(o_id && { o_id }),
            ...(role_id && { role_id }),
            ...(batch_id && { batch_id }),
            ...(candidate_email && { 
                email: candidate_email 
            }),
            assignment_status: 1,
            status: 1
        }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getProfiles = async (uids) => {
    try {
        return await ProgradUsers.find({ uid: { $in: uids } }, { _id: 0, password: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getProfile = async (params) => {
    try {
        const { user_id } = params;
        return await ProgradUsers.findOne(
            { uid: user_id }, { _id: 0, password: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

const getQuizzesUsersByEmails = async (params) => {
    try {
        const { applicant_emails } = params;
        return await QuizzesUsers.find(
            { email: { $in: applicant_emails } }, { _id: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

const getReports = async (params) => {
    try {
        const { test_ids } = params;
        const pipeline = [
            { 
                $match: {
                    test_id: { $in: test_ids }
                } 
            },
            {
                $sort: {
                    total_score: -1
                }
            },
            { 
                $group: { 
                    _id: { uid: "$uid", test_id: "$test_id" },
                    doc: { $first: "$$ROOT" }
                } 
            },
            { 
                $replaceRoot: { 
                    newRoot: "$doc" 
                } 
            },
            { 
                $project: { 
                    _id: 0,
                    uid: 1,
                    o_id: 1,
                    instance_id: 1,
                    test_id: 1,
                    total_score: 1,
                    total_possible_score: 1,
                    attempt: 1
                } 
            }
        ];
        return await Reports.aggregate(pipeline).allowDiskUse(true);
    } catch (err) {
        throw err;
    }
}

const getReport = async (params) => {
    try {
        const { attempt, instance_id, o_id, test_id, user_id } = params;
        return await Reports.findOne({ attempt, instance_id, o_id, test_id, uid: user_id }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getTypeFormLogs = async (params) => {
    try {
        const { batch_id, o_id, role_id } = params;
        return await TypeformLogs.find(
            {
                ...(batch_id && { batch_id }),
                ...(o_id && { o_id }), 
                ...(role_id && { role_id }) 
            }, 
            { _id: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getApplications,
    getProfiles,
    getProfile,
    getQuizzesUsersByEmails,
    getReports,
    getReport,
    getTypeFormLogs
}