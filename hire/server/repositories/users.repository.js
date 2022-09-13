const Users = require("../models/users.model");
const QuizzesUsers = require("../models/quizzes/users.model");
const GlobalAutoIncrement = require("../models/globalAutoincrement.model");


const getUser = async (params) => {
    try {
        const { o_id, uid } = params;
        return await Users.findOne({ o_id, uid }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getUserByUid = async (uid) => {
    try {
        return await Users.findOne({ uid }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getQuizzesUserByUid = async (uid) => {
    try {
        return await QuizzesUsers.findOne({ uid }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getQuizzesUserByEmail = async (params) => {
    try {
        const { o_id, email } = params;
        return await QuizzesUsers.findOne({ o_id, email }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getUsersByUid = async (uids) => {
    try {
        return await Users.find({ uid: { $in: uids } }, { _id: 0 }).lean();
    } catch (err) {
        throw err;
    }
}

const getUsers = async (params) => {
    try {
        const { o_id } = params;
        const query = {
            o_id, invite_status: 1,
        }
        return await Users.find(
            query,{ _id: 0, pswd: 0, pswd_status: 0, vcode: 0 }
        ).lean();
    } catch (err) {
        throw err;
    }
}

const inviteUsers = async (params) => {
    try {
        const { o_id, emails, users } = params;
        const autoIncrement = await GlobalAutoIncrement.findOne( 
            { field_id: "uid" }, { _id: 0, next_id: 1 }
        );
        const nextId = autoIncrement.next_id;
        const existingUsers = await Users.find(
            { email: { $in: emails }, o_id }, { _id: 0 }
        ).lean();
        const newInvitees = users.filter(user => 
            !existingUsers.find(existingUser => existingUser.email === user.email)
        ).map((user, key) => ({ uid: nextId + key, ...user }));
        const revokedInvitees = existingUsers.filter(user => user.invite_status === 0)
        .reduce((accumulator, existingInvitee) => {
            return {
                queries: [
                    ...accumulator.queries,
                    {
                        updateOne: {
                            filter: { uid: existingInvitee.uid },
                            update: { $set: { ...existingInvitee, invite_status: 1 } }
                        }
                    }
                ],
                uids: [
                    ...accumulator.uids,
                    existingInvitee.uid
                ]
            }
        }, { queries: [], uids: [] });

        let existingInvitees = [];
        if(revokedInvitees.queries.length) {
            existingInvitees = await Users.bulkWrite(revokedInvitees.queries)
            .then(async () => {
                return await Users.find(
                    {
                        o_id,
                        uid: { $in: revokedInvitees.uids },
                        invite_status: 1
                    },
                    { _id: 0 }
                ).lean();
            });
        }

        if(newInvitees.length) {
            await Users.insertMany(newInvitees)            
            .then(async(users) => {
                await GlobalAutoIncrement.findOneAndUpdate(
                    { field_id: "uid" }, 
                    { $set: { next_id: nextId + users.length } }
                );
    
                return users;
            });
        }

        return [ ...existingInvitees, ...newInvitees ];
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const updateStatus = async (params) => {
    try {
        const { invitation_status, status, o_id, user_id } = params;
        const updateQuery = {
            $set: {
                ...(!invitation_status ? { invite_status: status } : 
                    { 
                        status, 
                        deactivated_on: Math.round(new Date().getTime() / 1000) 
                    }
                )
            }
        }
        return await Users.findOneAndUpdate({ o_id, uid: user_id }, updateQuery);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getUser,
    getUserByUid,
    getUsersByUid,
    getQuizzesUserByUid,
    getQuizzesUserByEmail,
    getUsers,
    inviteUsers,
    updateStatus
}