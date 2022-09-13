import { check_signin, logout_user } from "../utils/signin";
import { __getUserType } from "../utils/user-details";

const MobileValidator = (props) => {
    const isLoggedIn = check_signin();
    // Check if user is logged in and if user is not student
    if (isLoggedIn && __getUserType() !== 6) {
        return (
            <div>
                <div className="w-screen h-screen bg-aluminium text-lg font-bold fixed top-0 left-0 flex text-center flex-col p-4 justify-center items-center lg:hidden">
                    Prograd can only be accessed on a computer/PC.
                    <div className="default-blue-btn filled-blue mt-4" onClick={() => { logout_user(); window.location.href = '/'; }}>Log out</div>
                </div>
                <div className="hidden lg:block">
                    {props.children}
                </div>
            </div>
        )
    } else {
        return props.children
    }
}

export default MobileValidator;