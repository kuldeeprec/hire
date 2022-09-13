import { __getCookie } from "./cookie";
import keys from "../config/keys";
// import { G_CF_URL } from "../constants/constants";
import jwtDecode from 'jwt-decode';

const decodeToken = () => {
    if (__getCookie(keys.cookiePrefix + "ut").cookieExists === false) return undefined;
    return jwtDecode(__getCookie(keys.cookiePrefix + "ut").cookieValue);
}

const __getUserName = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.name : '';
};

const __getFirstName = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? (decodedToken.foreName ? decodedToken.foreName : decodedToken.name) : '';
};

const __getEmail = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.email : '';
};

const __getToken = () => {
    const cookie = __getCookie(keys.cookiePrefix + "ut");
    if (cookie !== undefined && cookie.cookieValue !== null && cookie.cookieValue !== undefined) {
        return cookie.cookieValue;
    }
    return "";
};

const __getUID = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.uid : '';
};

const __getMobileNumber = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.mobileNumber : '';
};

const __getYear = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.year : undefined;
};

const __getUserType = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.access_type : undefined;
}

const __getUserOrganization = () => {
    var decodedToken = decodeToken();
    return decodedToken !== undefined ? decodedToken.organisation_name : undefined;
}

export { decodeToken, __getUserName, __getEmail, __getToken, __getUID, __getMobileNumber, __getYear, __getUserType, __getFirstName, __getUserOrganization };