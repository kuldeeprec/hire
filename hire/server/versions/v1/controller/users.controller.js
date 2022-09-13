const usersService = require("../../../services/users.service");

const getUsers = async (req, res) => {
    try {
        const queryParams = req.query;
        const token = req.token;
        const response = await usersService.getUsers({
            ...queryParams,
            ...token
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const inviteUsers = async (req, res) => {
    try {
        const bodyParams = req.body;
        const token = req.token;
        const response = await usersService.inviteUsers({
            ...bodyParams,
            ...token
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateStatus = async (req, res) => {
    try {
        const bodyParams = req.body;
        const token = req.token;
        const response = await usersService.updateStatus({
            ...token,
            ...bodyParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const resendInvitation = async (req, res) => {
    try {
        const bodyParams = req.body;
        const token = req.token;
        const response = await usersService.resendInvitation({
            ...token,
            ...bodyParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getUsers,
    inviteUsers,
    updateStatus,
    resendInvitation
}