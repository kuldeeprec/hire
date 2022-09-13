const CompanySpq = require("../models/companyspq.model");
const addquestion = async (params) => {
  try {
    return await CompanySpq.create(params);
  } catch (err) {
    throw err;
  }
};
const getquestion = async (params) => {
  try {
    const { o_id, role_id } = params;
    return await CompanySpq.find({ o_id, role_id }, { _id: 0 }).lean();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addquestion,
  getquestion,
};
