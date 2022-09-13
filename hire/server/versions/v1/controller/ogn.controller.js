const ognService = require("../../../services/ogn.service");
const { decodeToken } = require("../../../utils/jwt");

const getOrganizations = async (req, res) => {
    try {
        const response = await ognService.getOrganizations();
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getOrganization = async (req, res) => {
    try {
        const queryParams = req.query;
        const response = await ognService.getOrganization(queryParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const checkDomain = async (req, res) => {
    try {
        const queryParams = req.query;
        let token = req.headers['x-access-token'] || req.headers['authorization']; 
        
        if(token) {
            token = decodeToken(token);
        }
        // Parse domain
        if (queryParams.domain) {
            const response = await ognService.checkDomain({
                ...queryParams,
                ...token
            });
            return res.status(200).send(response);
        }
        return res.status(500).send("Missing Parameters")
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getUsers = async (req, res) => {
    try {
        const queryParams = req.query;
        const response = await ognService.getUsers(queryParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const addOrganization = async (req, res) => {
    try {
        const bodyParams = req.body;
        const tokenParams = req.token;
        const response = await ognService.addOrganization({
            ...tokenParams,
            ...bodyParams
        });
        return res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

const updateOrganization = async (req, res) => {
    try {
        const bodyParams = req.body;
        const tokenParams = req.token;
        const response = await ognService.updateOrganization({
            ...tokenParams,
            ...bodyParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateStatus = async (req, res) => {
    try {
        const bodyParams = req.body;
        const response = await ognService.updateStatus(bodyParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getOrganizations,
    getOrganization,
    checkDomain,
    getUsers,
    addOrganization,
    updateOrganization,
    updateStatus
}