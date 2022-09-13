const usersRepository = require("../repositories/users.repository");
const ognRepository = require("../repositories/ogn.repository");
const { getRandomString } = require("../utils/common");
const { encrypt } = require("../utils/helper");
const { sendInvitationMail } = require("../utils/templates");
const moment = require("moment");
const env = process.env.NODE_ENV;
const keys = require("../config/keys");


// Helper functions start
const sendInvitations = async (o_id, uid, users) => {
    try {
        const G_PROTOCOL = keys.domainEnv[env].g_protocol;

        const G_PORTAL_DOMAIN = keys.domainEnv[env].g_portal_domain;
    
        const sender = await usersRepository.getUserByUid(uid);
    
        const organization = await ognRepository.getOrganizationById(o_id);
    
        let data;
        users.forEach(async (user) => {
            data = {
                email: user.email,
                sender: sender.name,
                domain: organization.domain,
                link: G_PROTOCOL + "://" + organization.domain + G_PORTAL_DOMAIN 
                + "/signup?email=" + user.email + "&vcode=" + 
                encodeURIComponent(encrypt(user.vcode))
            }

            await sendInvitationMail(data);
        });
    } catch (err) {
        throw err;
    }
}
// Helper functions end

const getUsers = async (params, args = false) => {
    try {
        const response = await usersRepository.getUsers(params);

        if (response) {
            const users = response.map((user, key) => 
                ({
                    key,
                    uid: user.uid,
                    email: user.email,
                    name: user.name ? user.name : user.email.split('@')[0],
                    status: user.status ? "Joined | " +
                    moment(user.joined_on * 1000).format("DD MMM YYYY") :
                    !user.status && user.deactivated_on ? "Deactivated | " + 
                    moment(user.deactivated_on * 1000).format("DD MMM YYYY"): "Pending",
                    last_active: moment(user.last_active * 1000)
                    .format("DD MMM YYYY | h:mm A") + " IST",
                    state: user.joined_on !== undefined ? user.status :
                    user.invite_status,
                    invitation_status: user.joined_on !== undefined
                })
            );

            if(args) {
                return users;
            }

            return { status: 1, message: "Success", users }
        }

        if(args) {
            return [];
        }

        return { status: 0, message: "Failed to fetch users"}

    } catch (err) {
        throw err;
    }
}

const inviteUsers = async (params, args = false) => {
    try {
        const { o_id, uid, emails } = params;

        const users = emails.map((email) => ({
            email,
            o_id,
            user_type: 1,
            invite_status: 1,
            invited_on: Math.round(new Date().getTime() / 1000),
            vcode: getRandomString(8),
            last_active: Math.round(new Date().getTime() / 1000)
        }));

        const response = await usersRepository.inviteUsers({ ...params, users });

        if(response) {
            await sendInvitations(o_id, uid, response);

            if(args) {
                return response;
            }

            return { status: 1, message: "Users invited successfully" };
        }

        if(args) {
            return [];
        }

        return { status: 0, message: "Failed to ivite users" };
    } catch (err) {
        throw err;
    }
}

const updateStatus = async (params) => {
    try {
        const response = await usersRepository.updateStatus(params);
        if(response) {
            const users = await getUsers(params, true);
            return { status: 1, message: "User status updated successfully", users };
        }
        return { status: 0, message: "Failed to update user status" }
    } catch (err) {
        throw err;
    }
}

const resendInvitation = async (params) => {
    try {
        const { o_id, uid, receiver_id } = params;
        const response = await usersRepository.getUser({ o_id, uid: receiver_id });
        if(response && response.status === 0) {
            await sendInvitations(o_id, uid, [response]);
            return { status: 1, message: "Invitation sent successfully" }
        }

        return { status: 0, message: "Failed to resend invitation"}
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getUsers,
    inviteUsers,
    updateStatus,
    resendInvitation
}