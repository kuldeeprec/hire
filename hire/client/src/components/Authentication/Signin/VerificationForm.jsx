import React, { useState, useRef } from "react";
import axios from "axios";
import OtpForm from "../Common/OtpForm";
import Spinner from "../../Spinner/Spinner";
import { G_API_URL } from "../../../constants/constants";
import { getSubdomain, openNotification} from "../../../utils/common";
import { encrypt } from "../../../utils/encryption";


const VerificationForm = (props) => {
    const { email, setOtp } = props;

    const [isLoading, setLoading] = useState(false);
    const cancelToken = useRef(undefined);

    const submitOtp = (inOTP) => {

        const subdomain = getSubdomain();

        setLoading(true);

        //Check if there are any previous pending requests
        if (typeof cancelToken.current != typeof undefined) {
            cancelToken.current.cancel(
                "Operation canceled due to new request."
            );
        }

        //Save the cancel token for the current request
        cancelToken.current = axios.CancelToken.source();

        axios.post(G_API_URL + "auth/validate-otp", {
            domain: subdomain,
            encrypted_email: encrypt(email),
            otp: inOTP
        }, {
            cancelToken: cancelToken.current.token
        }).then(response => {
            response = response.data;
            setLoading(false);
            if(response.status === 1) {
                setOtp(inOTP);
            } else {
                openNotification("error", response.message, 2);
            }
        }).catch(err => {
            console.log(err);
        });
    }


    return (
        <>
            <p className="mt-2 text-center text-lg">
                Enter the shortcode we’ve sent to <span className="font-bold">
                { email }</span> to proceed
            </p>
            <OtpForm submitOtp={submitOtp} />
            { isLoading && <Spinner /> }
        </>
    )
}

export default VerificationForm;