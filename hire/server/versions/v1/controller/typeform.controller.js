const typeformService = require("../../../services/typeform.service");

const saveLogs = async (req, res) => {
    try {
        const bodyParams = req.body;
        const fileParams = req.file;
        const response = await typeformService.saveLogs({
            ...bodyParams,
            ...fileParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    saveLogs
}