import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { G_API_URL } from "../../../constants/constants";
import { getSubdomain, openNotification} from "../../../utils/common";
import { encrypt } from "../../../utils/encryption";

const NewPasswordForm = (props) => {
    const { email, formRef, handleKeyUp, otp } = props;
    const [form] = Form.useForm();

    const [isLoading, setLoading] = useState(false);

    const createPassword = (values) => {
        if(values) {
            const domain = getSubdomain();
            setLoading(true);
            axios.post(G_API_URL + "auth/create-password", {
                code: otp,
                domain,
                encrypted_email: encrypt(email),
                encrypted_pass: encrypt(values.confirm_password)
            }).then(response => {
                response = response.data;
                setLoading(false);
                if(response.status === 1) {
                    window.location.reload();
                } else {
                    openNotification("error", response.message, 2);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <div className="mt-16">
            <h1 className="font-extrabold font-montserrat 
            text-center text-mob-subtitle lg:text-subtitle">
                Set new password
            </h1>
            <p className="mt-2 text-center text-lg">
                You’re setting the password for <span className="font-bold">
                {email}</span>
            </p>
            <Form className="grid mt-14 lg:justify-center" form={form}
            onFinish={createPassword} onKeyUp={handleKeyUp} ref={formRef}>
                <div>
                    <label className="font-bold opacity-66 text-xs">
                        New Password
                    </label>
                    <Form.Item
                        name="new_password"
                        rules= {[
                            { required: true, message: "New password cannot be empty" },
                            { min: 8, message: "Password must be at least 8 characters." }
                        ]}
                    >
                        <Input.Password
                            className="border-silver font-base 
                            focus:border-limegreen focus:shadow-none  
                            hover:border-silver mt-1 px-4 w-full lg:w-95" 
                            placeholder="Enter your password" 
                            type="password"
                        />
                    </Form.Item>
                </div>
                <div>
                    <label className="font-bold opacity-66 text-xs">
                        Confirm Password
                    </label>
                    <Form.Item
                        name="confirm_password"
                        rules= {[
                            { required: true, message: "Confirm password cannot be empty" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            })
                        ]}
                    >
                        <Input.Password
                            className="border-silver font-base 
                            focus:border-limegreen focus:shadow-none  
                            hover:border-silver mt-1 px-4 w-full lg:w-95" 
                            placeholder="Enter your password" 
                            type="password"
                        />
                    </Form.Item>
                </div>
                <Button className="default-blue-btn filled-blue 
                btn-large mt-2" htmlType="submit" loading={isLoading}>
                    Update
                </Button>
            </Form>
        </div>
    )
}

export default NewPasswordForm;