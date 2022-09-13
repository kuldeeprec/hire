import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input } from "antd";
import { encrypt } from "../../../utils/encryption";
import { getRurl, getSubdomain, openNotification } from "../../../utils/common";
import { signin_user } from "../../../utils/signin";
import { G_API_URL } from "../../../constants/constants";

const SigninForm = (props) => {
    const { formRef, handleKeyUp, setPasswordForgotten } = props;
    const [isLoading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const history = useHistory();

    const subdomain = getSubdomain();

    const signin = (values) => {
        if(values) {
            setLoading(true);
            axios.post(G_API_URL + "auth/signin", {
                encrypted_email: encrypt(values.email.toLowerCase()),
                encrypted_pass: encrypt(values.password),
                domain: subdomain
            }).then(response => {
                response = response.data;
                setLoading(false);
                if(response.status === 1) {
                    const rurl = getRurl();

                    signin_user(response.token);

                    if(response.is_details_requested) {
                        history.push("/details" + (rurl ? "?rurl=" + rurl : ""));
                    } else {
                        if(rurl) {
                            history.push(rurl);
                        } else {
                            history.push("/candidates-reports");
                        }
                    }
                } else {
                    openNotification('error', response.message, 3);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <div className="mt-8 lg:mt-14">
            <h1 className="font-extrabold font-montserrat 
            text-mob-subtitle lg:text-subtitle">
                Welcome back!
            </h1>

            <Form className="mt-14" form={form} onFinish={signin} 
            onKeyUp={handleKeyUp} ref={formRef}>
                <div>
                    <label className="font-bold opacity-66 text-xs">
                        Email
                    </label>
                    <Form.Item
                        name="email"
                        rules= {[{ 
                            required: true, 
                            message: "Email cannot be empty"
                        }]}
                    >
                        <Input 
                            className="border-silver font-base 
                            focus:border-limegreen focus:shadow-sm  
                            hover:border-silver mt-1 px-4 w-full lg:w-95 lowercase" 
                            placeholder="you@example.com" 
                            autoFocus
                        />
                    </Form.Item>
                </div>
                <div>
                    <label className="font-bold opacity-66 text-xs">
                        Password
                    </label>
                    <Form.Item
                        name="password"
                        rules= {[{ 
                            required: true, 
                            message: "Password cannot be empty"
                        }]}
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
                btn-large mt-8" htmlType="submit" loading={isLoading}>
                    Log in
                </Button>
            </Form>
            <p className="cursor-pointer mt-8 text-base text-ceruleanblue 
            underline w-max" onClick={() => setPasswordForgotten(true)}>
                Forgot password?
            </p>
        </div>
    )
}

export default SigninForm;