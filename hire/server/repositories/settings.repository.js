const Users = require("../models/users.model");

const updateUserDetails = async (params) => {
    try {
        const { name, o_id, uid } = params;
        return await Users.findOneAndUpdate({ o_id, uid }, { name }, { new: true }).lean();
    } catch (err) {
        throw err;
    }
}

const changePassword = async (params) => {
    try {
        const { new_password, o_id, uid } = params;
        return await Users.findOneAndUpdate({ o_id, uid }, { pswd: new_password });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    updateUserDetails,
    changePassword
}