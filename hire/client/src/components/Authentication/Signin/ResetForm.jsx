import React, { useState } from "react";
import axios from "axios";
import EmailForm from "../Common/EmailForm";
import { encrypt } from "../../../utils/encryption";
import { getSubdomain, openNotification } from "../../../utils/common";
import { G_PORTAL_DOMAIN, G_API_URL } from "../../../constants/constants";

const ResetForm = (props) => {
    const { formRef, handleKeyUp, setEmail } = props;

    const [isLoading, setLoading] = useState(false);

    const subdomain = getSubdomain();

    const resetPassword = (values) => {
        if(values) {
            setLoading(true);
            axios.post(G_API_URL + "auth/reset-password", {
                domain: subdomain,
                encrypted_email: encrypt(values.email)
            }).then(response => {
                response = response.data;
                setLoading(false);
                if(response.status === 1) {
                    setEmail(values.email);
                } else {
                    openNotification("error", response.message, 2);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <>
            <p className="mt-2 text-center text-lg">
                To reset your password, enter the email address you use to 
                sign in to <span className="font-bold">{ subdomain + 
                G_PORTAL_DOMAIN }</span>
            </p>
            <EmailForm formRef={formRef} handleFinish={resetPassword} 
            handleKeyUp={handleKeyUp} isLoading={isLoading} />
        </>
    )
}

export default ResetForm;