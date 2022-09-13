const TypeformLogs = require("../models/typeformLogs.model");

const getLogs = async (params) => {
    try {
        const { batch_id, o_id, role_id, emails } = params;
        return await TypeformLogs.find(
            { batch_id, o_id, role_id, email: { $in: emails } }
        ).lean();
    } catch (err) {
        throw err;
    }
}

const saveLogs = async (logs) => {
    try {
        return await TypeformLogs.insertMany(logs);
    } catch (err) {
        throw err;
    }
}

const updateLogs = async (logs) => {
    try {
        return await TypeformLogs.bulkWrite(logs);
    } catch (err) {
        throw err;
    }
}

module.exports = { getLogs, saveLogs, updateLogs }