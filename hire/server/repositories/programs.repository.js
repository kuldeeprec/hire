const JobApplications = require("../models/prograd/jobApplications.model");
const TypeformLogs = require("../models/typeformLogs.model");
const Notes = require("../models/notes.model");

const getApplications = async (params) => {
    try {
        const { uid } = params;
        return await JobApplications.find(
            { assignment_status: 1, uid }, { _id: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

const getTypeFormLogs = async (params) => {
    try {
        const { email, batch_ids } = params;
        return await TypeformLogs.find(
            { email, batch_id: { $in: batch_ids } }, { _id: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

const getNotes = async (params) => {
    try {
        const { email, batch_ids } = params;
        return await Notes.find(
            { email, batch_id: { $in: batch_ids } }, { _id: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    getApplications,
    getTypeFormLogs,
    getNotes
}