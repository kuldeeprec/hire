import { G_APP_PLATFORM, G_URL } from '../constants/constants';
import { __getUserType } from "./user-details";
// import { ReactComponent as CloseIcon } from '../assets/icons/svg_icons/x.svg';
const { notification } = require('antd');

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

const getSubdomain = () => {
    let host = window.location.host;
    let parts = host.split(".");
    let subdomain = undefined;
    
    if (
        (G_APP_PLATFORM === "local" && parts.length >= 2) ||    // Local
        (G_APP_PLATFORM === "dev" && parts.length >= 5) ||      // Dev
        (G_APP_PLATFORM === "prod" && parts.length >= 4)        // Prod
    ) {
        subdomain = parts[0] !== "www" ? parts[0] : undefined;
    }

    return subdomain
}

const getDefaultPath = () => {
    switch (__getUserType()) {
        case 3: 
            return "/assessments";
        case 5:
            return "/reports";
        case 6:
            return "/dashboard";
        case 8:
            return "/assessments";
        case 9:
            return "/billing";
        default:
            return "";
    }
}

const handleError = (error) => {
    if(error && error.status) {
        switch(error.status) {
            case 401: 
                window.location.href = G_URL;
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
}

const getSearchParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    let paramValue = urlParams.get(param);
    return paramValue;
}

const openNotification = (mode, msg, duration, top, container) => {
    let className="";
    switch (mode) {
        case "success":
            className = "success-notification-top shadow-notification border-silver p-4";
            break;
        case "warn":
            className = "warning-notification-top shadow-notification border-silver p-4";
            break;
        case "info":
            className = "info-notification-top shadow-notification border-silver p-4";
            break;
        default:
            className = "failure-notification-top shadow-notification border-silver p-4";
            break;
    }
    const args = {
        message: msg,
        description: '',
        duration: duration,
        top: top !== undefined ? top : 80,
        className: className,
        getContainer: () => container !== undefined ? document.querySelector(`${ container }`) : document.body,
        // closeIcon: <i className="icon icon-x"/>
    };
    notification.destroy();
    notification.open(args);
};

const genRandomString = (length) => {
    let strResult = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return strResult.split('').sort(function () { return 0.5 - Math.random() }).join('').slice(0, length);
}

const genRandomNumber = (length) => {
    let strResult = '0123456789';
    return strResult.split('').sort(function () { return 0.5 - Math.random() }).join('').slice(0, length);
}

const calcDuration = (secs) => {
    if (secs / 60 > 59) {
        let hrs = parseInt(secs / 3600)
        let mins = (secs - (hrs * 3600)) / 60
        return { hrs, mins }
    } else {
        return { hrs: 0, mins: (secs / 60) }
    }
}

const isFloat = (value) => {
    if(parseInt(value) !== parseFloat(value)) {
        return true;
    }

    return false;
}

const getRurl = () => {
    let rurl = getSearchParam('rurl');
    if (rurl !== undefined && rurl !== null && rurl !== '') {
        rurl = (rurl.length && rurl[0] === '/') ? rurl.slice(1) : rurl;
    }
    return rurl;
}

export {
    convertTimeIntoString,
    getSubdomain,
    getSearchParam,
    openNotification,
    genRandomString,
    genRandomNumber,
    getDefaultPath,
    handleError,
    calcDuration,
    isFloat,
    getRurl
}