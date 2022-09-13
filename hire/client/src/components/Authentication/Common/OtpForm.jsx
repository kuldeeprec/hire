import React, { useState } from "react";
import { Form } from "antd";
import OtpInput from 'react-otp-input-rc-17';

const OtpForm = (props) => {

    const { submitOtp } = props;

    const [inOTP, setInOTP] = useState("");
    const [form] = Form.useForm();


    const handleChange = (otp) => {
        setInOTP(otp);
        if(otp.length === 6) {
            submitOtp(otp);
        }
    }

    return (
        <>
            <Form className="otp-form mt-12" form={form}>
                <div className="otp-inputs-container flex">
                    <OtpInput
                        containerStyle="otp-inputs-container"
                        className="otp-input mr-2 last:mr-0 lg:mr-4"
                        value={inOTP}
                        onChange={(otp) => handleChange(otp)}
                        numInputs={6}
                        shouldAutoFocus
                        isInputNum
                    />
                </div>
            </Form>
            <style jsx={"true"}>{`
                .otp-inputs-container .otp-input input {
                    width: 64px !important;
                    height: 64px;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Lato", sans-serif;
                    font-weight: 500;
                    border: 1px solid var(--silver);
                    border-radius: 2px;
                    transition: all 0.3s;
                }
    
                .otp-inputs-container .otp-input input:focus {
                    border-color: var(--limegreen);
                    box-shadow: 0 10px 10px 0 rgba(0,0,0,0.1);
                    outline: none;
                }

                @media only screen and (max-device-width: 760px) {
                    .otp-inputs-container .otp-input input {
                        width: 50px !important;
                        height: 50px;
                    }
                }
            `}</style>
        </>
    )
}

export default OtpForm;