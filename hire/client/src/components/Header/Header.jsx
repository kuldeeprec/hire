import React from "react";
import { NavLink } from "react-router-dom";
import { logout_user } from "../../utils/signin";
import ProgradLogo from "../../assets/brand/prograd_logo.svg";

const Header = () => {

    return (
        <>
            <div className="navbar-container p-4 lg:px-8 lg:py-1.5 flex 
            items-center justify-between">
                <div className="navbar-left-container flex items-center h-full">
                    {/* Logo */}
                    <NavLink to={"/"} className="brand-logo c-pointer
                    flex items-center">
                        <img src={ProgradLogo} alt="logo" />
                    </NavLink>
                </div>
                <div className="navbar-right-container hidden lg:flex items-center h-full">
                    <NavLink 
                        to={"/settings"} 
                        activeClassName="active bg-bluelagoon text-dove rounded-sm hover:text-dove" 
                        className="flex flex-col items-center hover:bg-aluminium hover:text-carbon cursor-pointer px-2 py-1"
                    >
                        <i className="icon icon-settings text-lg" />
                        <span className="mt-1 text-xs">Settings</span>
                    </NavLink>
                    <div className="flex flex-col items-center hover:bg-aluminium cursor-pointer px-4 py-3 ml-4" onClick={() => { logout_user(); window.location.href = '/'; }}>
                        <i className="icon icon-log-out text-lg" />
                        <span className="mt-1 text-xs">Logout</span>
                    </div>
                </div>
            </div>
            <style jsx={"true"}>{`
                @media (min-width: 320px) {
                    .navbar-container {
                        height: 64px;
                        background: #ffffff;
                        border: 1px solid #E4E4E4;
                        border-top: 0;
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.08);
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 1000;
                        transition: all 0.2s;
                    }

                    .navbar-container .navbar-left-container .brand-logo > img {
                        height: 32px;
                    }

                    .navbar-container .navbar-left-container 
                    .divider {
                        border-left: 1px solid rgba(0, 0, 0, 0.1);
                    }

                    .account-dropdown .ant-popover-inner-content,
                    .help-dropdown .ant-popover-inner-content {
                        padding: 0;
                    }

                    .account-dropdown .ant-popover-arrow,
                    .help-dropdown .ant-popover-arrow {
                        display: none;
                    }
                }
            `}</style>
        </>
    )
}

export default Header;