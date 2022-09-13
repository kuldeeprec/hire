const Assignments = require("../models/quizzes/assignments.model");
const Instances = require("../models/quizzes/instances.model");
const ProgradUsers = require("../models/prograd/users.model");
const QuizzesUsers = require("../models/quizzes/users.model");
const { Reports, ReportLogs } = require("../models/quizzes/reports.model");
const {
  GlobalAutoincPlatform,
} = require("../models/quizzes/globalAutoincrement.model");
const { getRandomString } = require("../utils/common");
const moment = require("moment");

const getApplications = async (params) => {
  try {
    const { uid } = params;
    return await JobApplicationsModel.find({ uid }, { _id: 0 }).lean();
  } catch (err) {
    throw err;
  }
};

const getQuizzesUsers = async (params) => {
  try {
    const { email } = params;
    return await QuizzesUsers.find({ email }, { _id: 0 }).lean();
  } catch (err) {
    throw err;
  }
};

const getAssignments = async (groups) => {
  try {
    return await Assignments.find(
      { groups: { $in: groups } },
      { _id: 0 }
    ).lean();
  } catch (err) {
    throw err;
  }
};

const getInstances = async (instanceIds) => {
  try {
    return await Instances.find(
      { instance_id: { $in: instanceIds } },
      { _id: 0 }
    ).lean();
  } catch (err) {
    throw err;
  }
};

const getInstanceById = async (instanceId) => {
  return await Instances.findOne(
    {
      instance_id: instanceId,
      status: 1,
      instance_status: 1,
    },
    {
      _id: 0,
    }
  );
};

const getReports = async (instanceIds, uids) => {
  try {
    return await Reports.find(
      { instance_id: { $in: instanceIds }, uid: { $in: uids } },
      { _id: 0 }
    ).lean();
  } catch (err) {
    throw err;
  }
};

const getReportLogs = async (instanceIds, uids) => {
  try {
    return await ReportLogs.find(
      { instance_id: { $in: instanceIds }, uid: { $in: uids } },
      { _id: 0 }
    ).lean();
  } catch (err) {
    throw err;
  }
};

const getUserAssignments = async (uid, ognId, userGroups) => {
  var query = {
    o_id: ognId,
    $or: [
      {
        groups: {
          $in: userGroups,
        },
      },
      {
        users: uid,
      },
    ],
  };

  return await Assignments.find(query, {
    _id: 0,
  });
};

const getOgnAssignments = async (o_id) => {
  return await Assignments.find({ o_id }, { _id: 0 }).lean();
};

// Get active instance for auto assignment
const getActiveInstance = async (params) => {
  try {
    const { domain, test_id } = params;
    const currentTime = moment().utcOffset("+05:30").unix();
    return await Instances.findOne(
      {
        test_id,
        instance_author_ref: domain,
        "settings.start_date": {
          $ne: -1,
          $lte: currentTime,
        },
        "settings.end_date": {
          $ne: -1,
          $gte: currentTime,
        },
        status: 1,
      },
      {
        _id: 0,
      }
    );
  } catch (err) {
    throw err;
  }
};

const inviteAndAssignTest = async (params) => {
  try {
    const { domain, email, group } = params;

    const user = await QuizzesUsers.findOne({
      email: email.toLowerCase(),
      o_id: domain,
    });

    if (!user || !user.joined_on) {
      const progradUser = await ProgradUsers.findOne(
        { email },
        { _id: 0 }
      ).lean();
      if (!user) {
        const nextIdDoc = await GlobalAutoincPlatform.findOneAndUpdate(
          { field_id: "uid" },
          { $inc: { nextId: 1 } }
        );

        return QuizzesUsers.create({
          o_id: domain,
          invite_status: 1,
          invited_on: Math.round(new Date().getTime() / 1000),
          joined_on: Math.round(new Date().getTime() / 1000),
          vcode: getRandomString(8),
          last_active: Math.round(new Date().getTime() / 1000),
          name: progradUser.firstName + " " + progradUser.lastName,
          pswd: progradUser.password,
          pswd_status: 1,
          email: email.toLowerCase(),
          group: [group.toString()],
          uid: nextIdDoc.nextId,
          user_type: 6,
          status: 1,
        });
      }

      return await QuizzesUsers.findOneAndUpdate(
        {
          email: email.toLowerCase(),
          o_id: domain,
          group: { $nin: [group.toString()] },
        },
        {
          $push: { group: group.toString() },
          $set: {
            name: progradUser.firstName + " " + progradUser.lastName,
            joined_on: Math.round(new Date().getTime() / 1000),
            last_active: Math.round(new Date().getTime() / 1000),
            pswd: progradUser.password,
            pswd_status: 1,
            vcode,
            status: 1,
          },
        },
        { new: true }
      ).lean();
    }

    return await QuizzesUsers.findOneAndUpdate(
      {
        email: email.toLowerCase(),
        o_id: domain,
        group: { $nin: [group.toString()] },
      },
      { $push: { group: group.toString() } },
      { new: true }
    ).lean();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getApplications,
  getQuizzesUsers,
  getAssignments,
  getInstances,
  getInstanceById,
  getReports,
  getReportLogs,
  getUserAssignments,
  getOgnAssignments,
  getActiveInstance,
  inviteAndAssignTest,
};
