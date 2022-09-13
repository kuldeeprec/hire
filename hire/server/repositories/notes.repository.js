const Notes = require("../models/notes.model");

const getNote = async (params) => {
    try {
        const { batch_id, email, role_id, o_id, round } = params;
        return await Notes.findOne({ batch_id, email, role_id, o_id, round }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getNotes = async (params) => {
    try {
        const { role_id, batch_id, o_id } = params;
        return await Notes.find(
            { 
                ...(batch_id && { batch_id }),
                ...(o_id && { o_id }), 
                ...(role_id && { role_id }) 
            }, { _id: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

const saveNote = async (params) => {
    try {
        const { batch_id, email, role_id, o_id, round } = params;
        return await Notes.findOneAndUpdate(
            { batch_id, email, role_id, o_id, round },
            { $set: { ...params } },
            { new: true, upsert: true }
        ).lean();
    } catch (err) {
        throw err;
    }
}

module.exports = { getNote, getNotes, saveNote };