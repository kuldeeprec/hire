const reportsService = require("../../../services/reports.service");
const keys = require('../../../config/keys');
const env = process.env.NODE_ENV;


const superCollection = keys.superCollection[env];

const getReports = async (req, res) => {
    try {
        const queryParams = req.query;
        const tokenParams = req.token;
        if(tokenParams.o_id === superCollection) {
            delete tokenParams.o_id;
            delete tokenParams.domain;
        }
        const response = await reportsService.getReports({
            ...tokenParams,
            ...queryParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getProfile = async (req, res) => {
    try {
        const queryParams = req.query;
        const tokenParams = req.token;
        const response = await reportsService.getProfile({
            ...queryParams,
            ...tokenParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getDetailedReport = async (req, res) => {
    try {
        const queryParams = req.query;
        const tokenParams = req.token;
        const response = await reportsService.getDetailedReport({
            ...tokenParams,
            ...queryParams
        });
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const getOptions = async (req, res) => {
    try {
        const tokenParams = req.token;
        const response = await reportsService.getOptions(tokenParams);
        return res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = { getReports, getProfile, getDetailedReport, getOptions };