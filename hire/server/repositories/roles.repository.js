const Roles = require("../models/roles.model");
const Batches = require("../models/batches.model");
const GlobalAutoIncrement = require("../models/globalAutoincrement.model");
const JobsBoard = require("../models/prograd/jobsBoard.model");
const JDTemplate = require("../models/prograd/jdTemplate.model");

const getRoles = async (params) => {
  try {
    const { o_id } = params;
    return await Roles.find({ o_id }, { _id: 0 }).lean();
  } catch (err) {
    throw err;
  }
};

const addBatch = async (params) => {
  try {
    const { o_id, role_id, rounds } = params;
    const autoIncrement = await GlobalAutoIncrement.findOne(
      { field_id: "batch_id" },
      { _id: 0 }
    ).lean();
    const nextId = autoIncrement.next_id;
    return await Batches.create({
      batch_id: "B_" + nextId,
      status: 1,
      role_id,
      rounds,
      o_id,
    }).then(async (response) => {
      if (response) {
        await GlobalAutoIncrement.findOneAndUpdate(
          { field_id: "batch_id" },
          { $inc: { next_id: 1 } }
        );
        return response;
      }
      return null;
    });
  } catch (err) {
    throw err;
  }
};

const addRole = async (params) => {
  try {
    const { role_name, o_id } = params;
    const autoIncrement = await GlobalAutoIncrement.findOne(
      { field_id: "role_id" },
      { _id: 0 }
    ).lean();
    const nextId = autoIncrement.next_id;
    return await Roles.create({
      role_id: "R_" + nextId,
      status: 1,
      role_name,
      o_id,
    }).then(async (response) => {
      if (response) {
        await GlobalAutoIncrement.findOneAndUpdate(
          { field_id: "role_id" },
          { $inc: { next_id: 1 } }
        );
        const batch = await addBatch({ ...params, role_id: "R_" + nextId });
        response.batch_id = batch.batch_id;
        response.role_id = "R_" + nextId;
        return response;
      }
      return null;
    });
  } catch (err) {
    throw err;
  }
};

const getBatch = async (params) => {
  try {
    const { batch_id, o_id, role_id } = params;
    return await Batches.findOne(
      { o_id, role_id, batch_id },
      { _id: 0 }
    ).lean();
  } catch (err) {
    throw err;
  }
};

const getBatches = async (params) => {
  try {
    const { o_id, role_id, batch_id } = params;
    return await Batches.find(
      {
        ...(batch_id && { batch_id }),
        ...(o_id && { o_id }),
        ...(role_id && { role_id }),
      },
      { _id: 0 }
    ).lean();
  } catch (err) {
    throw err;
  }
};

const getBatchesByIds = async (batchIds) => {
  try {
    return await Batches.find(
      { batch_id: { $in: batchIds } },
      { _id: 0 }
    ).lean();
  } catch (err) {
    throw err;
  }
};

const updateBatch = async (params) => {
  try {
    const { batch, o_id, role_id, rounds } = params;
    return await Batches.findOneAndUpdate(
      {
        o_id,
        role_id,
        batch_id: batch.batch_id,
      },
      {
        $set: {
          rounds,
        },
      }
    );
  } catch (err) {
    throw err;
  }
};

const getAllRoles = async () => {
  try {
    return await Roles.find({}).lean();
  } catch (err) {
    throw err;
  }
};

const getAllBatches = async () => {
  try {
    return await Batches.find({}).lean();
  } catch (err) {
    throw err;
  }
};

const getJobDescription = async (params) => {
  try {
    const { o_id, role_id } = params;

    if (o_id && role_id) {
      return await JobsBoard.findOne({ o_id, role_id }, { _id: 0 }).lean();
    }

    return await JDTemplate.findOne({}, { _id: 0 }).lean();
  } catch (err) {
    throw err;
  }
};

const updateJobDescription = async (params) => {
  try {
    const { role_id, o_id } = params;
    return await JobsBoard.findOneAndUpdate(
      { role_id, o_id },
      { $set: params },
      { upsert: true, new: true }
    );
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getRoles,
  addRole,
  addBatch,
  getBatch,
  getBatches,
  getBatchesByIds,
  updateBatch,
  getAllRoles,
  getAllBatches,
  getJobDescription,
  updateJobDescription,
};
