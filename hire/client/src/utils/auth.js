import axios from "axios";
import { G_API_URL, G_URL } from "../constants/constants";
import { getSubdomain } from "./common";
import { __getToken, __getUserType } from "./user-details";

const check_domain = async () => {
    const token = __getToken();
    const subdomain = getSubdomain();
    return await axios.get(G_API_URL + "ogn/check/domain", {
        ...(token && {
            headers: {
                Authorization: __getToken()
            }
        }),
        params: {
            domain: subdomain
        }
    }).then((response) => {
        response = response.data;
        if(response.status === 0) {
            window.location.href = G_URL + "login";
        }
    }).catch((error) => {
        throw error;
    });
}

const redirectUserAfterSignin = (history) => {
    switch (__getUserType()) {
        // Redirect user based on user type
        case 6: history.push('/dashboard'); break;        // Students view
        case 3: history.push('/assessments'); break;      // Admin View
        case 5: history.push('/reports'); break;          // Analyst view
        case 8: history.push('/assessments'); break;      // Educator view
        case 9: history.push('/billing'); break;          // Billing user view
        default: history.push('/assessments'); break;     // other user types
    }
}

export { check_domain, redirectUserAfterSignin }