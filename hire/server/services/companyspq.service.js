const companyspqRepository = require("../repositories/companyspq.repository");
const addquestion = async (params) => {
  try {
    const response = await companyspqRepository.addquestion(params);
    if (response) {
      return { status: 1, message: "question added successfully" };
    }
    return { status: 0, message: "Failed to add question" };
  } catch (err) {
    throw err;
  }
};
const getquestion = async (params) => {
  try {
    const response = await companyspqRepository.getquestion(params);
    if (response) {
      return {
        status: 1,
        message: "question fetch successfully",
        response: response,
      };
    }
    return { status: 0, message: "Failed to failed question" };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  addquestion,
  getquestion,
};
