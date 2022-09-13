const ognRepository = require("../repositories/ogn.repository");
const rolesRepository = require("../repositories/roles.repository");
const usersService = require("../services/users.service");
const moment = require("moment");

const checkDomain = async (params) => {
    try {
        const { domain } = params;

        const response = await ognRepository.getOrganization(domain);

        if (response) {
            const organization_name = response.name;

            return { 
                status: 1, 
                message: "Success", 
                organization_name
            };
        }

        return { status: 0, message: "Domain not found!" }
    } catch (err) {
        throw err;
    }
}

const getOrganizations = async () => {
    try {
        const response = await ognRepository.getOrganizations();

        if(response) {
            const roles = await rolesRepository.getAllRoles();
            const organizations = response.map(organization => ({
                ...organization,
                roles: roles.filter(role => role.o_id === organization.id).length,
                domain: organization.domain + ".recruit.prograd.org",
                last_modified: moment(organization.last_modified * 1000).format("DD MMM YYYY")
            }));
            return { 
                status: 1, 
                message: "Successfully retrieved organizations",
                organizations
            }
        }

        return { status: 0, message: "Failed to fetch organizations" }
    } catch (err) {
        throw err;
    }
}

const getOrganization = async (params) => {
    try {
        const { id } = params;
        const response = await ognRepository.getOrganizationById(id);
        if(response) {
            return { 
                status: 1, 
                message: "Organization details retrieved successfully", 
                organization: response
            }
        }
        return { status: 0, message: "Organization not found" }
    } catch (err) {
        throw err;
    }
}

const getUsers = async (params) => {
    try {
        const response = await ognRepository.getUsers(params);
        if(response) {
            const users = response.map(user => ({
                uid: user.uid,
                email: user.email,
                status: user.status ? "Joined" :
                !user.status && user.deactivated_on ? "Deactivated": "Pending",
                state: user.joined_on !== undefined ? user.status :
                user.invite_status,
                invitation_status: user.joined_on !== undefined
            }));
            return { status: 1, message: "Users retrieved successfully", users }
        }
        return { status: 0, message: "Failed to retrieve users" }
    } catch (err) {
        console.log(err)
        throw err;
    }
}

const addOrganization = async (params) => {
    try {
        const { domain } = params;
        const organization = await ognRepository.getOrganization(domain);
        if(!organization) {
            const response = await ognRepository.addOrganization(params);
            if(response) {
                let invitees = await usersService.inviteUsers({
                    ...params,
                    o_id: response.id
                }, true);
                invitees = invitees.map(invitee => invitee.uid);
                const organization = await ognRepository.updateOrganization({
                    id: response.id,
                    invitees
                });
                return { status: 1, message: "Organization added successfully", organization };
            }
            return { status: 0, message: "Failed to add organization" }
        }
        return { status: 0, message: "Domain already exists" };
    } catch (err) {
        throw err;
    }
}

const updateOrganization = async (params) => {
    try {
        const { domain, emails } = params;
        const organization = await ognRepository.getOrganization(domain);
        if(organization) {
            if(emails.length) {
                let invitees = await usersService.inviteUsers({
                    ...params,
                    o_id: organization.id
                }, true);
                params.invitees = [
                    ...new Set([
                        ...organization.invitees,
                        ...invitees.map(invitee => invitee.uid)
                    ])
                ];
            }
            const response = await ognRepository.updateOrganization(params);
            if(response) {
                return { 
                    status: 1, 
                    message: "Organization details updated successfully",
                    organization: response
                };
            }
            return { status: 0, message: "Failed to update organization" }
        }
        return { status: 0, message: "Organization not found" };
    } catch (err) {
        throw err;
    }
}

const updateStatus = async (params) => {
    try {
        const response = await ognRepository.updateStatus(params);
        if(response) {
            return { status: 1, message: "Status updated successfully" }
        }
        return { status: 0, message: "Failed to update status" }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkDomain,
    getOrganizations,
    getOrganization,
    getUsers,
    addOrganization,
    updateOrganization,
    updateStatus
}