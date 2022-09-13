const Organizations = require("../models/organizations.model");
const Users = require("../models/users.model");
const QuizzesOrganization = require("../models/quizzes/ognSettings.model");
const GlobalAutoIncrement = require("../models/globalAutoincrement.model");


const getOrganizations = async () => {
    try {
        return await Organizations.find({},{ _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getOrganization = async (domain) => {
    try {
        return await Organizations.findOne({ domain }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getOrganizationById = async (id) => {
    try {
        return await Organizations.findOne({ id }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getQuizzesOrganization = async (domain) => {
    try {
        return await QuizzesOrganization.findOne({ domain }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getQuizzesOrganizationById = async (id) => {
    try {
        return await QuizzesOrganization.findOne({ id }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getQuizzesOrganizations = async () => {
    try {
        return await QuizzesOrganization.find({}, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getUsers = async (params) => {
    try {
        const { id } = params;
        return await Organizations.findOne({ id }, { _id: 0 }).lean()
        .then(async (response) => {
            if(response && response.invitees.length) {
                return await Users.find(
                    { 
                        uid: { 
                            $in: response.invitees 
                        }, 
                        invite_status: 1 
                    }, 
                    { _id: 0 }
                ).lean();
            }
            return [];
        });
    } catch (err) {
        throw err;
    }
}

const addOrganization = async (params) => {
    try {
        const { domain, name } = params;
        const autoIncrement = await GlobalAutoIncrement.findOne(
            { field_id: "o_id" }, { _id: 0, next_id: 1 }
        );
        const nextId = autoIncrement.next_id;
        return await Organizations.create({
            id: "O_" + nextId,
            status: 1,
            domain,
            name,
            last_modified: Math.round(new Date().getTime() / 1000),
            roles: 0
        }).then(async (response) => {
            if(response) {
                await GlobalAutoIncrement.findOneAndUpdate(
                    { field_id: "o_id" },
                    { $inc: { next_id: 1 } }
                );
                return response;
            }
            return null;
        });
    } catch (err) {
        throw err;
    }
}

const updateOrganization = async (params) => {
    try {
        const { id } = params;
        return await Organizations.findOneAndUpdate(
            { id }, { $set: { ...params } }, { new: true }
        );
    } catch (err) {
        throw err;
    }
}

const updateStatus = async (params) => {
    try {
        const { id, status } = params;
        return await Organizations.findOneAndUpdate(
            { id }, { $set: { status } }, { new: true }
        );
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getOrganizations,
    getOrganization,
    getOrganizationById,
    getQuizzesOrganization,
    getQuizzesOrganizationById,
    getQuizzesOrganizations,
    getUsers,
    addOrganization,
    updateOrganization,
    updateStatus
}