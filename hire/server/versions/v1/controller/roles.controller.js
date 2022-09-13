const rolesService = require("../../../services/roles.service");
const companyspqService = require("../../../services/companyspq.service");

const getRoles = async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await rolesService.getRoles({
      ...queryParams,
    });
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addRole = async (req, res) => {
  try {
    const bodyParams = req.body;
    const tokenParams = req.token;
    const fileParams = req.file;
    if (bodyParams.batch) {
      bodyParams.batch = JSON.parse(bodyParams.batch);
    }
    const response = await rolesService.addRole({
      ...tokenParams,
      ...bodyParams,
      ...fileParams,
    });
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addBatch = async (req, res) => {
  try {
    const bodyParams = req.body;
    const tokenParams = req.token;
    const response = await rolesService.addBatch({
      ...tokenParams,
      ...bodyParams,
    });
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateBatch = async (req, res) => {
  try {
    const bodyParams = req.body;
    const tokenParams = req.token;
    const response = await rolesService.updateBatch({
      ...tokenParams,
      ...bodyParams,
    });
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getJobDescription = async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await rolesService.getJobDescription(queryParams);
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateJobDescription = async (req, res) => {
  try {
    const bodyParams = req.body;
    const tokenParams = req.token;
    const fileParams = req.file;
    const response = await rolesService.updateJobDescription({
      ...tokenParams,
      ...bodyParams,
      ...fileParams,
    });
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const addcompanyspq = async (req, res) => {
  try {
    const param = req.body;
    const response = await companyspqService.addquestion(param);
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const getcompanyspq = async (req, res) => {
  try {
    const queryParams = req.query;
    const response = await companyspqService.getquestion({
      ...queryParams,
    });
    return res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getRoles,
  addRole,
  addBatch,
  updateBatch,
  getJobDescription,
  updateJobDescription,
  addcompanyspq,
  getcompanyspq,
};
