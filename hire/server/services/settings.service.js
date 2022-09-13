const settingsRepository = require('../repositories/settings.repository');
const usersRepository = require('../repositories/users.repository');
const { decrypt } = require('../utils/helper');
const { createJWT } = require('../utils/jwt');

const updateUserDetails = async (params) => {
    try {
        const response = await settingsRepository.updateUserDetails(params);

        if(response) {
            response.domain = params.domain;
            response.organization_name = params.organization_name;
            const token = createJWT(response);
            return { status: 1, message: "Successfully updated user details", token };
        }
        return { status: 1, message: "Failed to update user details" };
    } catch (err) {
        throw err;
    }
}

const changePassword = async (params) => {
    try {
        const { current_password } = params;
        const user = await usersRepository.getUser(params);
        if(user) {
            if(decrypt(current_password) === decrypt(user.pswd)) {
                const response = await settingsRepository.changePassword(params);
                if(response) {
                    return { status: 1, message: "Password updated successfully" }
                }
            }
            return { status: 0, message: "Please enter a valid current password" }
        }
        return { status: 0, message: "Failed to change password. Try again later!" }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    updateUserDetails,
    changePassword
}