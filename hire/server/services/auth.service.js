const env = process.env.NODE_ENV;
const keys = require("../config/keys");
const authRepository = require('../repositories/auth.repository');
const ognRepository = require("../repositories/ogn.repository");
const { sendVerificationMail, sendWelcomeMail, sendResetPasswordMail } = require("../utils/templates");
const { createJWT } = require("../utils/jwt");

const getOrganization = async (domain) => {
    if(domain) {
        // get organization info
        return await ognRepository.getOrganization(domain);
    }

    return null;
}

const signinUser = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.organization_name = organization.name;
            params.o_id = organization.id;
            const response = await authRepository.signinUser(params);
            if(response) {
                return { 
                    status: 1, 
                    message: "Success", 
                    token: response.token
                };
            }
        }

        return { 
            status: 0, 
            message: "Log in failed, please check your credentials" 
        };
    } catch (err) {
        throw err;
    }
}

const resetPassword = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.o_id = organization.id;
            const response = await authRepository.resetPassword(params);
            if(response) {
                const { email, name, code } = response;
                sendResetPasswordMail(email, name, code);
                return { status: 1, message: "Success" }
            }
        }

        return { 
            status:0, 
            message: "Password reset failed, Please check your email" 
        }
    } catch (err) {
        throw err;
    }
}

const validateOtp = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.o_id = organization.id;
            return await authRepository.validateOtp(params);
        }

        return { status: 0, message: "Invalid domain!" }
    } catch (err) {
        throw err;
    }
}

const createPassword = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.o_id = organization.id;
            return await authRepository.createPassword(params);
        }

        return { status: 0, message: "Invalid domain!" }
    } catch (err) {
        throw err;
    }
}

const joinOrganization = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.o_id = organization.id;
            
            const response = await authRepository.joinOrganization(params);

            if(response) {
                const { email, code } = response;
                await sendVerificationMail(email, code);
                return { status: 1, message: "Success" }
            }
        }

        return { status: 0, message: "Invitation invalid!" }
    } catch (err) {
        throw err;
    }
}

const verifyOtp = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.o_id = organization.id;
            
            return await authRepository.verifyOtp(params);
        }

        return { status: 0, message: "Invalid domain!" }
    } catch (err) {
        throw err;
    }
}

const createAccount = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.organization_name = organization.name;
            params.o_id = organization.id;
            const response = await authRepository.createAccount(params);
            if(response) {
                const G_PROTOCOL = keys.domainEnv[env].g_protocol;
                const G_PORTAL_DOMAIN = keys.domainEnv[env].g_portal_domain;
                const { email, name } = response;
                const domainUrl = G_PROTOCOL + '://' + domain + G_PORTAL_DOMAIN;
                response.domain = domain;
                response.organization_name = organization.name;
                await sendWelcomeMail(email, name, domainUrl);
                const token = createJWT(response);
                return { status: 1, message: "Success", token }
            }
            return { status: 0, message: "Invitation not valid!" }
        }

        return { status: 0, message: "Invalid domain!" }
    } catch (err) {
        throw err;
    }
}

const getAttributes = async (params) => {
    try {
        const { domain } = params;

        const organization = await getOrganization(domain);

        if(organization) {
            params.o_id = organization.id;
            const response = await authRepository.getAttributes(params);
            if(response) {
                return { 
                    status: 1, 
                    message: "Success", 
                    attributes: response,
                    organization_name: organization.name
                }
            }

            return { status: 0, message: "Failed to fetch attributes" }
        }

        return { status: 0, message: "Invalid domain!" }
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