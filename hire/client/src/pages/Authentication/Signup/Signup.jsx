import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AuthHeader from "../../../components/Header/AuthHeader";
import AuthVector from "../../../assets/imgs/auth/auth-vector.svg";
import SignupForm from "../../../components/Authentication/Signup/SignupForm";
import { getSearchParam, getSubdomain, openNotification } from "../../../utils/common";
import { __getToken } from "../../../utils/user-details";
import { encrypt } from "../../../utils/encryption";
import { signin_user } from "../../../utils/signin";
import { G_API_URL } from "../../../constants/constants";

const Signup = () => {
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    const subdomain = getSubdomain();
    // Get url params to verify user email
    const vcode = getSearchParam('vcode');
    const email = getSearchParam('email');

    const signup = (values) => {
        if(values) {
            setLoading(true);
            axios.post(G_API_URL + "auth/create-account", {
                vcode,
                name: values.name,
                encrypted_email: encrypt(values.email),
                encrypted_pass: encrypt(values.password),
                domain: subdomain
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then((response) => {
                response = response.data;
                if(response.status === 1) {
                    signin_user(response.token);
                    setTimeout(() => {
                        setLoading(false);
                        history.push("/candidates-reports");
                    }, 1000);
                } else {
                    setLoading(false);
                    openNotification("error", response.message, 2);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 h-screen lg:grid-cols-1.5/1">
                <div className="bg-aluminium px-4 py-4 lg:px-20 lg:py-16">
                    <AuthHeader isRedirectable={true} />
                    <SignupForm email={email} isLoading={isLoading} signup={signup} />
                </div>
                <div className="bg-lightblue">
                    <div className="bg-bottom bg-contain bg-no-repeat 
                    h-full" style={{
                        backgroundImage: 'url(' + AuthVector + ')'
                    }}/>
                </div>
            </div>
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
            `}</style>
        </>
    )
}

export default Signup;