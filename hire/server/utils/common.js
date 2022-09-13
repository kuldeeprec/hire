// const env = process.env.NODE_ENV;
// const keys = require('../config/keys');
// const textLocalCreds = keys.textLocal[env];
// const axios = require('axios');

const isPrivateQuestion = (questionId) => {
    return questionId.includes("QP_");
}

const getRandomString = (length) => {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

const getRandomnumber = (length) => {
    let randomChars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

// convert time into string
const convertTimeIntoString = time_in_sec => {
    var seconds = time_in_sec % 60;
    var minutes = Math.floor(time_in_sec / 60);
    var hours = Math.floor(minutes / 60);
    var days = -1;
    var weeks = -1;
    var months = -1;
    if (hours > 24) {
        days = Math.floor(hours / 24);
        hours %= 24;
    }
    if (days >= 7) {
        weeks = Math.floor(days / 7);
        days %= 7;
    }
    if (weeks >= 5) {
        months = Math.floor(weeks / 5);
        weeks %= 5;
    }
    if (minutes >= 60) minutes %= 60;

    var time_string = "";

    if (months !== -1) {
        time_string += months + "m ";
    }
    if (weeks !== -1) {
        time_string += weeks + "w ";
    }
    if (days !== -1) time_string += days + "d ";
    if (hours !== 0) time_string += hours + "h ";
    if (minutes !== 0) time_string += minutes + "m ";
    if (seconds === 0) {
        if (minutes === 0 && hours === 0) time_string += seconds + "s";
    } else time_string += seconds + "s";

    return time_string;
};

const toFixed = (value) => {
    if(parseInt(value) !== parseFloat(value)) {
        return value.toFixed(2);
    }
    return value;
}

// const sendSMS = async (message, clientNumber) => {
//     // let message = `${ otp } is your verification code to verify your mobile on ProGrad. Do not share this with anyone - ProGrad`;
//     const sender = encodeURIComponent("FCSEDU");
//     const options = {
//         method: 'POST',
//         url: `https://api.textlocal.in/send/?apiKey=${ textLocalCreds.apiKey }&sender=${ sender }&numbers=${ clientNumber }&message=${ encodeURIComponent(message) }`,
//         json: true
//     }
//     return await axios(options)
//         .then((res) => {
//             const { data } = res;
//             if(data.errors != undefined) {
//                 console.log("TextLocal SMS send API error:", data.errors[0].message);
//                 return -1;
//             }
//             return { sid: data.messages[0]['id'] };
//         }).catch((err) => console.log(err));
// }

module.exports = {
    isPrivateQuestion,
    getRandomString,
    getRandomnumber,
    convertTimeIntoString,
    toFixed,
    // sendSMS
}