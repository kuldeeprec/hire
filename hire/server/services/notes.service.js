const notesRepository = require("../repositories/notes.repository");

const getNote = async (params) => {
    try {
        const response = await notesRepository.getNote(params);
        if(response) {
            return { status: 1, message: "Note retrieved successfully", data: response };
        }
        return { status: 0, message: "Failed to retrieve note" }
    } catch (err) {
        throw err;
    }
}

const saveNote = async (params) => {
    try {
        const response = await notesRepository.saveNote(params);
        if(response) {
            delete response._id;
            return { status: 1, message: "Note save successfully", data: response }
        }
        return { status: 0, message: "Failed to save note" }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getNote,
    saveNote
}