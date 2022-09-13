const authService = require("../../../services/auth.service");
const { decrypt } = require("../../../utils/helper");

const signinUser = async (req, res) => {
    try {
        const bodyParams = req.body;
        bodyParams.email = decrypt(bodyParams.encrypted_email);
        const response = await authService.signinUser(bodyParams);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const resetPassword = async (req, res) => {
    try {
        const bodyParams = req.body;
        bodyParams.email = decrypt(bodyParams.encrypted_email);
        bodyParams.ip = req.userIP;
        const response = await authService.resetPassword(bodyParams);
        res.status(200).send(response); 
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const validateOtp = async (req, res) => {
    try {
        const bodyParams = req.body;
        bodyParams.email = decrypt(bodyParams.encrypted_email);
        const response = await authService.validateOtp(bodyParams);
        res.status(200).send(response); 
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createPassword = async (req, res) => {
    try {
        const bodyParams = req.body;
        bodyParams.email = decrypt(bodyParams.encrypted_email);
        const response = await authService.createPassword(bodyParams);
        res.status(200).send(response); 
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const joinOrganization = async (req, res) => {
    try {
        const bodyParams = req.body;
        bodyParams.email = decrypt(bodyParams.encrypted_email);
        bodyParams.ip = req.userIP;
        const response = await authService.joinOrganization(bodyParams);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const verifyOtp = async (req, res) => {
    try {
        const bodyParams = req.body;
        bodyParams.email = decrypt(bodyParams.encrypted_email);
        const response = await authService.verifyOtp(bodyParams);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createAccount = async (req, res) => {
    try {
        const bodyParams = req.body;
        bodyParams.email = decrypt(bodyParams.encrypted_email);
        bodyParams.pswd = bodyParams.encrypted_pass;
        if(bodyParams.vcode) {
            bodyParams.vcode = decodeURIComponent(bodyParams.vcode);
            if(bodyParams.vcode.includes(" ")) {
                bodyParams.vcode = bodyParams.vcode.split(" ").join("+");
            }
            bodyParams.vcode = decrypt(bodyParams.vcode);
        }
        const response = await authService.createAccount(bodyParams);
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

const getAttributes = async (req, res) => {
    try {
        const queryParams = req.query;
        queryParams.email = decrypt(queryParams.encrypted_email);
        const response = await authService.getAttributes(queryParams);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    signinUser,
    resetPassword,
    validateOtp,
    createPassword,
    joinOrganization,
    verifyOtp,
    createAccount,
    getAttributes
}