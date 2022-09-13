const notesService = require("../../../services/notes.service");

const getNote = async (req, res) => {
    try {
        const queryParams = req.query;
        const response = await notesService.getNote(queryParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const saveNote = async (req, res) => {
    try {
        const bodyParams = req.body;
        const tokenParams = req.token;
        bodyParams.updated_by = tokenParams.uid;
        bodyParams.remarker_name = tokenParams.name;
        const response = await notesService.saveNote(bodyParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { getNote, saveNote };