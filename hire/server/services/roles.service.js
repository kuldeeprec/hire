const rolesRepository = require("../repositories/roles.repository");
const { getRandomString } = require("../utils/common");
const getRoles = async (params) => {
  try {
    const response = await rolesRepository.getRoles(params);
    if (response) {
      const batches = await rolesRepository.getBatches(params);
      const roles = response.map((role) => {
        role.batches = batches
          .filter((batch) => role.role_id === batch.role_id)
          .map((batch) => {
            batch.rounds.forEach((round, key) => {
              batch["round_" + (key + 1) + "_type"] = round.type;
              batch["round_" + (key + 1) + "_cutoff"] = round.cutoff;
              batch["round_" + (key + 1) + "_result"] = round.result;
              if (round.test_id)
                batch["round_" + (key + 1) + "_test_id"] = round.test_id;
              if (round.name)
                batch["round_" + (key + 1) + "_name"] = round.name;
            });
            batch.batch_id = batch.batch_id;
            batch.rounds = batch.rounds.length;
            return batch;
          });
        return role;
      });
      return {
        status: 1,
        message: "Roles retrieved successfully",
        roles,
      };
    }
    return { status: 0, message: "Failed to fetch roles" };
  } catch (err) {
    throw err;
  }
};

const getRounds = (batch) => {
  return [...Array(batch.rounds)].map((round, key) => {
    round = {};
    round.id = getRandomString(6);
    round.type = batch["round_" + (key + 1) + "_type"];
    round.cutoff = batch["round_" + (key + 1) + "_cutoff"];
    round.result = 0;
    if (batch["round_" + (key + 1) + "_test_id"]) {
      round.test_id = batch["round_" + (key + 1) + "_test_id"];
    }
    if (batch["round_" + (key + 1) + "_name"]) {
      round.name = batch["round_" + (key + 1) + "_name"];
    }
    if (batch["round_" + (key + 1) + "_result"]) {
      round.result = 1;
    }
    return round;
  });
};

const addRole = async (params) => {
  try {
    const { batch } = params;
    params.rounds = getRounds(batch);
    const response = await rolesRepository.addRole(params);
    if (response) {
      const jobDescription = JSON.parse(params.buffer.toString());
      if (jobDescription) {
        jobDescription.role_id = response.role_id;
        jobDescription.o_id = response.o_id;
        jobDescription.batch_id = response.batch_id;
        await rolesRepository.updateJobDescription(jobDescription);
      }
      return {
        status: 1,
        message: "Role added successfully",
        role_id: response.role_id,
      };
    }
    return { status: 0, message: "Failed to add role" };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addBatch = async (params) => {
  try {
    const { batch } = params;
    params.rounds = getRounds(batch);
    const response = await rolesRepository.addBatch(params);
    if (response) {
      return { status: 1, message: "Batch added successfully" };
    }
    return { status: 0, message: "Failed to add batch" };
  } catch (err) {
    throw err;
  }
};

const updateBatch = async (params) => {
  try {
    const { batch } = params;
    params.rounds = getRounds(batch);
    const response = await rolesRepository.updateBatch(params);
    if (response) {
      return { status: 1, message: "Batch updated successfully" };
    }
    return { status: 0, message: "Failed to update batch" };
  } catch (err) {
    throw err;
  }
};

const getJobDescription = async (params) => {
  try {
    const response = await rolesRepository.getJobDescription(params);
    if (response) {
      return {
        status: 1,
        message: "Job description retrieved successfully",
        job_description: response,
      };
    }
    return { status: 0, message: "Failed to retrieve job description" };
  } catch (err) {
    throw err;
  }
};

const updateJobDescription = async (params) => {
  try {
    const { o_id, role_id, buffer } = params;
    if (buffer) {
      const jobDescription = JSON.parse(buffer.toString());
      const response = await rolesRepository.updateJobDescription({
        ...jobDescription,
        o_id,
        role_id,
      });
      if (response) {
        return { status: 1, message: "Job description updated successfully" };
      }
      return { status: 0, message: "Failed to update job description" };
    }
    return { status: 0, message: "Please upload a job description json file" };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  getRoles,
  addRole,
  addBatch,
  updateBatch,
  getJobDescription,
  updateJobDescription,
};
