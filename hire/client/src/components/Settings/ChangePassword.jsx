import React, { useState, useRef } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details";
import { encrypt } from "../../utils/encryption";
import { handleError, openNotification } from "../../utils/common";

const ChangePassword = () => {
    const [form] = Form.useForm();

    const formRef = useRef();

    const [isLoading, setLoading] = useState(false);

    const handleFinish = (values) => {
        if(values) {
            setLoading(true);
            axios.put(G_API_URL + "settings/change-password", {
                new_password: encrypt(values.new_password),
                current_password: encrypt(values.current_password)
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then((response) => {
                response = response.data;
                if(response.status === 1) {
                    setTimeout(() => {
                        setLoading(false);
                        openNotification("success", response.message, 2);
                        formRef.current.resetFields();
                    }, 1000);
                } else {
                    setLoading(false);
                    openNotification("error", response.message, 2);
                }
            }).catch((error) => {
                error = error.response;
                handleError(error);
            })
        }
    }
    return (
        <Form className="grid mt-14 lg:justify-center" form={form}
        ref={formRef} onFinish={handleFinish}>
            <div>
                <label>
                    <span className="font-bold opacity-66 text-xs">
                        Current Password
                    </span>
                    <span className="text-tomato">*</span>
                </label>
                <Form.Item
                    name="current_password"
                    rules= {[
                        { required: true, message: "New password cannot be empty" },
                        { min: 8, message: "Password must be at least 8 characters." }
                    ]}
                >
                    <Input.Password
                        className="border-silver font-base 
                        focus:border-limegreen focus:shadow-none h-12 
                        hover:border-silver mt-1 px-4 w-full lg:w-95" 
                        placeholder="Enter your password" 
                        type="password"
                    />
                </Form.Item>
            </div>
            <div>
                <label>
                    <span className="font-bold opacity-66 text-xs">
                        New Password
                    </span>
                    <span className="text-tomato">*</span>
                </label>
                <Form.Item
                    name="new_password"
                    rules= {[
                        { required: true, message: "Confirm password cannot be empty" },
                        { min: 8, message: "Password must be at least 8 characters." }
                    ]}
                >
                    <Input.Password
                        className="border-silver font-base 
                        focus:border-limegreen focus:shadow-none h-12
                        hover:border-silver mt-1 px-4 w-full lg:w-95" 
                        placeholder="Enter your password" 
                        type="password"
                    />
                </Form.Item>
            </div>
            <Button className="default-blue-btn filled-blue 
            btn-large mt-2 !w-95" htmlType="submit" loading={isLoading}>
                Update Password
            </Button>
        </Form>
    )
}

export default ChangePassword;