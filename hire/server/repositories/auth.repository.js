const Users = require("../models/users.model");
const QuizzesUsers = require("../models/quizzes/users.model");
const ResetRequests = require("../models/resetRequests.model");
const { GlobalAutoincPlatform } = require("../models/quizzes/globalAutoincrement.model");
// const JoinRequests = require("../models/joinRequests.model");
// const Attributes = require("../models/attributes.model");
const ognRepository = require("../repositories/ogn.repository");
const { decrypt } = require("../utils/helper");
const { createJWT } = require("../utils/jwt");


const checkPassword = (inPassword, existingPassword) => {
    inPassword = decrypt(inPassword);
    existingPassword = decrypt(existingPassword);
    if (inPassword === existingPassword) {
        return true;
    } else {
        return false;
    }
}

const signinUser = async (params) => {
    try {
        const { email, o_id, encrypted_pass } = params;
        
        if(email && o_id && encrypted_pass) {
            return Users.findOne({ email, o_id, status: 1 }).lean()
            .then(async (user) => {
                if(user) {
                    if(checkPassword(encrypted_pass, user.pswd)) {     
                        // Update Last Active
                        let activeTime = Math.round(Date.now() / 1000);
                        await Users.findOneAndUpdate(
                            { email, o_id },
                            { $set: { last_active: activeTime } }
                        );
                        user.domain = params.domain;
                        user.organization_name = params.organization_name;
                        return { token: createJWT(user), user };
                    }
                }  
                return null;
            });
        }

        return null;
    } catch (err) {
        throw err;
    }
}

const resetPassword = async (params) => {
    try {
        const { email, ip, o_id } = params;
        return await Users.findOne({ email, o_id, status: 1 }).lean()
        .then(async (user) => {
            if(user) {
                const data = {
                    uid: user.uid,
                    ip,
                    vcode: Math.floor(100000 + Math.random() * 900000),
                    vcode_expiry: parseInt(new Date().getTime() / 1000) + 86400,
                    request_count: 0,
                    requested_at: Math.round(new Date().getTime() / 1000)
                }

                const response = await ResetRequests.findOneAndUpdate(
                    { uid: user.uid }, data, { upsert: true, new: true}
                );

                if(response) {
                    return { 
                        name: user.name, 
                        email: user.email, 
                        code: response.vcode 
                    }
                }
            }
            return null;
        });
    } catch (err) {
        throw err;
    }
}

const validateOtp = async (params) => {
    try {
        const { email, otp, o_id } = params;
        if(email && params) {
            const user = await Users.findOne({ email, o_id }).lean();
            const resetDoc = await ResetRequests.findOne({uid: user.uid}).lean(); 
            if(resetDoc) {
                const {vcode, vcode_expiry, request_count} = resetDoc;
                if (request_count < 3) {
                    if(vcode === otp && vcode_expiry > (Math.round(
                    Date.now() / 1000))) {
                        return {
                            status: 1,
                            message: "OTP validation Successful"
                        };
                    } else {
                        // Update request_count
                        await ResetRequests.updateOne({uid: user.uid}, {
                            $set: {
                                "request_count": request_count + 1
                            }
                        });

                        return {
                            status: 0,
                            message: "Invalid OTP, please check again!"
                        };
                    }
                } else {
                    return {
                        status: 0,
                        message: "Too many request!, try after some times or contact support team."
                    }
                }
            }

        }
        return null;
    } catch (err) {
        throw err;
    }
}

const createPassword = async (params) => {
    try {
        const { code, email, encrypted_pass, o_id } = params;

        return await Users.findOne({ email, o_id }).lean()
        .then(async (user) => {
            if(user) {
                return await ResetRequests.findOne({uid: user.uid, vcode: code}).lean()
                .then(async (response) => {
                    if(response) {
                        const activeTime = Math.round(new Date().getTime() / 1000);
                        if(response.vcode === code && response.vcode_expiry > 
                        activeTime) {
                            await Users.updateOne(
                                { uid: user.uid },
                                { $set: { pswd: encrypted_pass } }
                            );
                            return {
                                status: 1,
                                message: "Password set successfully"
                            };
                        }
                    }
                    return {
                        status: 2,
                        message: "Password set failed, Invalid OTP"
                    };
                });
            } else {
                return { status: 2, message: "We don't have any account with this email." };
            }
        }).catch(err => {
            console.log(err);
        });
    } catch (err) {
        throw err;
    }
}

const joinOrganization = async (params) => {
    try {
        const { email, ip, o_id } = params;
        return await Users.findOne(
            { o_id, email, status: 0 }, { _id: 0 }
        )
        .lean()
        .then(async (user) => {
            if(user) {
                const data = {
                    uid: user.uid,
                    ip,
                    vcode: Math.floor(100000 + Math.random() * 900000),
                    vcode_expiry: parseInt(new Date().getTime() / 1000) + 86400,
                    request_count: 0,
                    requested_at: Math.round(new Date().getTime() / 1000)
                }

                // const response = await JoinRequests.findOneAndUpdate(
                //     { uid: user.uid }, data, { upsert: true, new: true}
                // );

                // if(response) {
                //     return { 
                //         email: user.email, 
                //         code: response.vcode 
                //     }
                // }
            }
            return null;
        });
    } catch (err) {
        throw err;
    }
}

const verifyOtp = async (params) => {
    try {
        const { email, otp, o_id } = params;
        if(email && otp && o_id) {
            const user = await Users.findOne({ email, o_id }).lean();
            const joinRequestDoc = await JoinRequests.findOne({uid: user.uid}).lean(); 
            if(joinRequestDoc) {
                const {vcode, vcode_expiry, request_count} = joinRequestDoc;
                if (request_count < 3) {
                    if(vcode === otp && vcode_expiry > (Math.round(
                    Date.now() / 1000))) {
                        // const attributes = await Attributes.find(
                        //     { 
                        //         o_id,
                        //         applicable_to: {
                        //             $in: [ 1, user.user_type === 6 ? 2 : 3 ]
                        //         },
                        //         status: 1 
                        //     }, 
                        //     { 
                        //         _id: 0 
                        //     }
                        // ).lean();
                        // return {
                        //     status: 1,
                        //     message: "OTP validation Successful",
                        //     attributes
                        // };
                    } else {
                        // Update request_count
                        await JoinRequests.updateOne({uid: user.uid}, {
                            $set: {
                                "request_count": request_count + 1
                            }
                        });

                        return {
                            status: 0,
                            message: "Invalid OTP, please check again!"
                        };
                    }
                } else {
                    return {
                        status: 0,
                        message: "Too many request!, try after some times or contact support team."
                    }
                }
            }

        }
        return null;
    } catch (err) {
        throw err;
    }
}

const createAccount = async (params) => {
    try {
        const { domain, o_id, vcode } = params;
        const paramsEmail = params.email;
        const email = paramsEmail.toLowerCase();
        return await Users.findOne({ email, o_id, joined_on: { $exists: true } }).lean()
        .then(async (user) => {
            if(user) {
                return {
                    status: 0,
                    message: "Account already exists, try logging in!",
                }
            }

            params.status = 1;
            params.pswd_status = 1;
            params.joined_on = Math.round(new Date().getTime() / 1000);
            params.last_active = Math.round(new Date().getTime() / 1000);
            delete params.domain;
            delete params.organization_name;
            delete params.encrypted_email;
            delete params.encrypted_pass;
            delete params.vcode;
            return await Users.findOneAndUpdate(
                { 
                    email, 
                    o_id, 
                    invite_status: 1, 
                    ...(vcode && { vcode }) 
                }, 
                { ...params }, 
                { new: true }
            ).then(async (response) => {
                if(response) {
                    const quizzesOrganization = await ognRepository.getQuizzesOrganization(domain);
                    if(quizzesOrganization) {
                        await QuizzesUsers.findOne(
                            { email, o_id: quizzesOrganization.id }
                        ).then(async (quizzesUser) => {
                            if(!quizzesUser) {
                                const nextIdDoc = await GlobalAutoincPlatform.findOne(
                                    { field_id: "uid" }, { _id: 0 }
                                );
                                await QuizzesUsers.create({
                                    o_id: quizzesOrganization.id,
                                    invite_status: 1,
                                    invited_on: Math.round(new Date().getTime() / 1000),
                                    joined_on: Math.round(new Date().getTime() / 1000),
                                    vcode,
                                    last_active: Math.round(new Date().getTime() / 1000),
                                    pswd: response.pswd,
                                    pswd_status: 1,
                                    email: email.toLowerCase(),
                                    name: response.name,
                                    uid: nextIdDoc.nextId,
                                    user_type: 3,
                                    status: 1
                                }).then(async (response) => {
                                    if(response) {
                                        await GlobalAutoincPlatform.findOneAndUpdate(
                                            { field_id: "uid" }, 
                                            { $inc: { nextId: 1 } }
                                        )
                                    }
                                })
                            } else if(!quizzesUser.joined_on) {
                                await QuizzesUsers.findOneAndUpdate(
                                    { email, o_id: quizzesOrganization.id },
                                    { 
                                        name: response.name,
                                        joined_on: Math.round(new Date().getTime() / 1000),
                                        last_active: Math.round(new Date().getTime() / 1000),
                                        pswd: response.pswd,
                                        pswd_status: 1,
                                        status: 1,
                                        vcode
                                    }
                                );
                            }
                        });
                    }
                }
                return response;
            });
        });
    } catch (err) {
        throw err;
    }
}

const getAttributes = async (params) => {
    try {
        // const { email, o_id } = params;
        // const user = await Users.findOne({ email, o_id }).lean();
        // if(user) {
        //     return await Attributes.find(
        //         { 
        //             o_id, 
        //             status: 1,
        //             attribute_type: { $ne: 5 },
        //             applicable_to: { 
        //                 $in: [ 1, user.user_type === 6 ? 2 : 3 ]
        //             }
        //         }, 
        //         { _id: 0 }
        //     ).sort({_id: 1});
        // }
        return null;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    signinUser,
    resetPassword,
    validateOtp,
    createPassword,
    joinOrganization,
    verifyOtp,
    createAccount,
    getAttributes
}