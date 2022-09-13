import React, { useState } from "react";
import AuthHeader from "../../../components/Header/AuthHeader";
import ResetForm from "../../../components/Authentication/Signin/ResetForm";
import OtpForm from "../../../components/Authentication/Signin/VerificationForm";
import NewPasswordForm from "../../../components/Authentication/Signin/NewPasswordForm";

const ResetPassword = (props) => {

    const { formRef, handleKeyUp } = props;

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    return (
        <div className="grid justify-center p-4 lg:p-16">
            <AuthHeader 
                centerAligned={true}
                isRedirectable={true}
            />
            {
                !otp ?
                <div className="grid justify-items-center mt-16">
                    <h1 className="font-extrabold font-montserrat 
                    text-mob-subtitle lg:text-subtitle">
                        Reset password
                    </h1>
                    {
                        !email ?
                        <ResetForm formRef={formRef} handleKeyUp={handleKeyUp} 
                        setEmail={setEmail} /> :
                        <OtpForm email={email} setOtp={setOtp} />
                    }
                </div> :
                <NewPasswordForm email={email} formRef={formRef} 
                handleKeyUp={handleKeyUp} otp={otp} />
            }
        </div>
    )
}

export default ResetPassword;