import { __setCookie, __deleteCookie, __getCookie } from "./cookie";
import keys from "../config/keys";

const signin_user = (token) => {
    if (token !== undefined) {
        __setCookie(keys.cookiePrefix + "ut", token, 1, "day");
    }
};

const check_signin = () => {
    const token_cookie = __getCookie(keys.cookiePrefix + "ut");
    return (
        token_cookie.cookieExists &&
        token_cookie.cookieValue !== undefined &&
        token_cookie.cookieValue !== null
    );
};

const logout_user = () => {
    let cookies = document.cookie.split(";");
    cookies.map((cookie) => __deleteCookie(cookie.split("=")[0]));
    localStorage.removeItem("Nocookie");
    // Clear Storage
    localStorage.clear();
    sessionStorage.clear();
};

export { signin_user, check_signin, logout_user };