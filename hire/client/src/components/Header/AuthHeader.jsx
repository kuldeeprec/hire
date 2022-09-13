import React from "react";
import { NavLink } from "react-router-dom";
import { Divider } from "antd";
import { G_URL } from "../../constants/constants";
// import Context from "../../store/context";
import QuizrBlackLogo from "../../assets/brand/prograd_logo.svg";

const AuthHeader = (props) => {
    const { centerAligned, isRedirectable } = props;

    // const { state } = useContext(Context);

    const { organizationName } = "SRM";

    const renderLogo = () => {
        if(!organizationName) {
            return (
                <NavLink to="/" className="brand-logo c-pointer
                flex items-center">
                    <img src={QuizrBlackLogo} alt="logo" />
                </NavLink>
            );
        }

        return (
            <a className="brand-logo c-pointer flex items-center" 
            href={isRedirectable ? G_URL : "#"}>
                <img src={QuizrBlackLogo} alt="logo" />
            </a>
        );
    }

    return (
        <>
            <div className={`auth-header h-12 flex items-center 
            ${centerAligned ? "justify-center" : ""}`}>
                { renderLogo() }
                {
                    organizationName &&
                    <>
                        <Divider className="border-silver divider 
                        mx-4 lg:mx-8 h-full" type="vertical" />

                        {/* College Name */}
                        <div className="text-base text-carbon 
                        text-opacity-60">
                            { organizationName }
                        </div>
                    </>
                }
            </div>

            <style jsx={"true"}>{`
                .auth-header img {
                    height: 32px;
                }
            `}</style>
        </>
    )
}

export default AuthHeader;