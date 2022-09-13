const keys = require("../config/keys");
const mailchimp = require("@mailchimp/mailchimp_transactional");
const mandrillClient = mailchimp(keys.mandrillKey);

const sendInvitationMail = async (params) => {
    try {
        const { email, sender, domain, link } = params;

        const message = {
            "subject": "You are invited",
            "from_email": "noreply@prograd.org",
            "from_name": "ProGrad",
            "to": [{
                "email": email,
                "name": "",
                "type": "to"
            }],
            "headers": {
                "Reply-To": "help@prograd.org"
            },
            "important": true,
            "merge_vars": [{
                "rcpt": email,
                "vars": [
                    {
                        "name": "sender_name",
                        "content": sender
                    },
                    {
                        "name": "domain_name",
                        "content": domain
                    },
                    {
                        "name": "link",
                        "content": link
                    }
                ]
            }]
        };

        await mandrillClient.messages.sendTemplate({
            "template_name": "qz-invite-template",
            "template_content": "",
            "message": message
        }, (result) => {
            console.log(`Mail to ${email} - MID:${result[0]["_id"]}`);
        }, (err) => {
            console.log(err);
        });
    } catch (err) {
        throw err;
    }
}

const sendVerificationMail = async (email, code) => {
    try {
        const message = {
            "subject": "Verify your email",
            "from_email": "noreply@prograd.org",
            "from_name": "ProGrad",
            "to": [{
                "email": email,
                "name": "",
                "type": "to"
            }],
            "headers": {
                "Reply-To": "help@prograd.org"
            },
            "important": true,
            "merge_vars": [{
                "rcpt": email,
                "vars": [
                    {
                        "name": "user_name",
                        "content": "user_name"
                    },
                    {
                        "name": "code",
                        "content": code
                    }
                ]
            }]
        };

        await mandrillClient.messages.sendTemplate({
            "template_name": "qz-verify-email",
            "template_content": "",
            "message": message
        }, (result) => {
            console.log(`Mail to ${email} - MID:${result[0]["_id"]}`);
        }, (err) => {
            console.log(err);
        });
    } catch (err) {
        throw err;
    }
}

const sendWelcomeMail = async (email, name, link) => {
    try {
        const message = {
            "subject": "[Important] Your account details",
            "from_email": "noreply@prograd.org",
            "from_name": "ProGrad",
            "to": [{
                "email": email,
                "name": name,
                "type": "to"
            }],
            "headers": {
                "Reply-To": "help@prograd.org"
            },
            "important": true,
            "merge_vars": [{
                "rcpt": email,
                "vars": [
                    {
                        "name": "user_name",
                        "content": name
                    },
                    {
                        "name": "domain_url",
                        "content": link
                    },
                    {
                        "name": "email",
                        "content": email
                    }
                ]
            }]
        };

        await mandrillClient.messages.sendTemplate({
            "template_name": "qz-welcome-post-sign-up",
            "template_content": "",
            "message": message
        }, (result) => {
            console.log(`Mail to ${email} - MID:${result[0]["_id"]}`);
        }, (err) => {
            console.log(err);
        });
    } catch (err) {
        throw err;
    }
}

const sendResetPasswordMail = async(email, name, code) => {
    try {
        const message = {
            "subject": "Reset your password",
            "from_email": "noreply@prograd.org",
            "from_name": "ProGrad",
            "to": [{
                "email": email,
                "name": name,
                "type": "to"
            }],
            "headers": {
                "Reply-To": "help@prograd.org"
            },
            "important": true,
            "merge_vars": [{
                "rcpt": email,
                "vars": [
                    {
                        "name": "user_name",
                        "content": name
                    },
                    {
                        "name": "code",
                        "content": code
                    }
                ]
            }]
        };

        await mandrillClient.messages.sendTemplate({
            "template_name": "qz-reset-password",
            "template_content": "",
            "message": message
        }, (result) => {
            console.log(`Mail to ${email} - MID:${result[0]["_id"]}`);
        }, (err) => {
            console.log(err);
        });
    } catch (err) {
        throw err;
    }
}

const sendTestInviteMail = async (email, name, link, sender_name, title) => {
    try {
        const message = {
            "subject": "A new assessment is assigned to you",
            "from_email": "noreply@prograd.org",
            "from_name": "ProGrad",
            "to": [{
                "email": email,
                "name": name,
                "type": "to"
            }],
            "headers": {
                "Reply-To": "help@prograd.org"
            },
            "important": true,
            "merge_vars": [{
                "rcpt": email,
                "vars": [
                    {
                        "name": "invitee_name",
                        "content": name
                    },
                    {
                        "name": "assessment_title",
                        "content": title
                    },
                    {
                        "name": "sender_name",
                        "content": sender_name
                    },
                    {
                        "name": "link",
                        "content": link
                    }
                ]
            }]
        };

        await mandrillClient.messages.sendTemplate({
            "template_name": "qz-invite-template-assessment",
            "template_content": "",
            "message": message
        }, (result) => {
            console.log(`Test invite Mail to ${ email } - MID:${ result[0]["_id"] }`);
        }, (err) => {
            console.log(err);
        });
    } catch (err) {
        console.log("error in sending test invite email", err)
        throw err;
    }
}

module.exports = {
    sendInvitationMail,
    sendVerificationMail,
    sendWelcomeMail,
    sendResetPasswordMail,
    sendTestInviteMail
}