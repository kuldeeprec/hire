import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthHeader from "../../../components/Header/AuthHeader";
import Organization from "../../../components/Authentication/Signin/Organization";
import SigninForm from "../../../components/Authentication/Signin/SigninForm";
import ResetPassword from "../Signin/ResetPassword";
import AuthVector from "../../../assets/imgs/auth/auth-vector.svg";
import { getSubdomain } from "../../../utils/common";
import { check_signin } from "../../../utils/signin";

const Signin = () => {

    const defaultState = {
        isPasswordForgotten: false,
    }

    const [state, setState] = useState(defaultState);

    const formRef = useRef();

    const history = useHistory();

    const { isPasswordForgotten }  = state;

    const subdomain = getSubdomain();

    useEffect(() => {
        if(check_signin()) {
            history.push("/candidates-reports");
        }
    }, [history]);

    const handleKeyUp = (event) => {
        if(event.keyCode === 13) {
            formRef.current.submit();
        }
    }

    const setPasswordForgotten = (value) => {
        setState(prev => ({
            ...prev,
            isPasswordForgotten: value
        }));
    }

    return (
        <>
            {
                !isPasswordForgotten ?
                <div className="grid grid-cols-1 h-screen lg:grid-cols-1.5/1">
                    <div className="bg-aluminium px-4 py-4 lg:px-20 lg:py-16">
                        <AuthHeader isRedirectable={true} />
                        {
                            !subdomain ? 
                            <Organization /> :
                            <SigninForm 
                                formRef={formRef}
                                handleKeyUp={handleKeyUp}
                                setPasswordForgotten={setPasswordForgotten} 
                            />
                        }
                    </div>
                    <div className="bg-lightblue hidden lg:block">
                        <div className="bg-bottom bg-contain bg-no-repeat 
                        h-full" style={{
                            backgroundImage: 'url(' + AuthVector + ')'
                        }}/>
                    </div>
                </div> :
                <ResetPassword formRef={formRef} handleKeyUp={handleKeyUp} />
            }

            <style jsx={"true"}>{`
                #root {
                    margin-top: 0;
                }

                .ant-form label {
                    font-size: 12px;
                }

                .ant-input {
                    font-size: 16px;
                    height: 51px;
                }

                .ant-input-affix-wrapper {
                    padding-top: 0 !important;
                    padding-bottom: 0 !important;
                }

                .ant-input-affix-wrapper:hover,
                .ant-input-affix-wrapper:not(
                .ant-input-affix-wrapper-disabled):hover {
                    border-color: var(--silver);
                }

                .ant-input-affix-wrapper:focus, 
                .ant-input-affix-wrapper-focused {
                    border-color: var(--limegreen) !important;
                    box-shadow: unset;
                }

                .ant-form-item-has-error .ant-input, 
                .ant-form-item-has-error .ant-input-affix-wrapper, 
                .ant-form-item-has-error .ant-input:hover, 
                .ant-form-item-has-error .ant-input-affix-wrapper:hover {
                    border-color:#ff4d4f !important;
                }

                .default-blue-btn {
                    height: 51px;
                    width: 381px;
                }

                @media only screen and (max-device-width: 760px) {
                    .default-blue-btn {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    )
}

export default Signin;