const programsService = require("../../../services/programs.service");

const getPrograms = async (req, res) => {
    try {
        const tokenParams = req.token;
        const response = await programsService.getPrograms(tokenParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getPrograms
}