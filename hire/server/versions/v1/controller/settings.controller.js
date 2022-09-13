const settingsService = require('../../../services/settings.service');

const updateUserDetails = async (req, res) => {
    try {
        const bodyParams = req.body;
        const tokenParams = req.token;
        const response = await settingsService.updateUserDetails({
            ...tokenParams,
            ...bodyParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const changePassword = async (req, res) => {
    try {
        const bodyParams = req.body;
        const tokenParams = req.token;
        const response = await settingsService.changePassword({
            ...bodyParams,
            ...tokenParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    updateUserDetails,
    changePassword
}