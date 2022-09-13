import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { __getEmail, __getToken, __getUserName } from "../../utils/user-details";
import { G_API_URL } from "../../constants/constants";
import { signin_user } from "../../utils/signin";
import { handleError } from "../../utils/common";

const UserDetails = () => {
    const [form] = Form.useForm();

    const [isLoading, setLoading] = useState(false);

    const handleFinish = (values) => {
        if(values) {
            setLoading(true);
            axios.put(G_API_URL + "settings/user-details", {
                ...values
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then((response) => {
                response = response.data;
                if(response.status === 1) {
                    signin_user(response.token);
                }
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }).catch((error) => {
                error = error.response;
                handleError(error);
            });
        }
    }

    return (
        <Form className="flex flex-col items-center mt-14" form={form} 
        onFinish={handleFinish}>
            <div>
                <label>
                    <span className="font-bold opacity-66 text-xs">
                        Email
                    </span>
                    <span className="text-tomato">*</span>
                </label>
                <Form.Item
                    name="email"
                    rules= {[{ 
                        required: true, 
                        message: "Email cannot be empty"
                    }]}
                    initialValue={__getEmail()}
                >
                    <Input className="border-silver font-base 
                        focus:border-limegreen focus:shadow-sm h-12
                        hover:border-silver mt-1 px-4 w-full lg:w-95" 
                        placeholder="you@example.com" 
                        autoFocus
                        disabled
                    />
                </Form.Item>
            </div>
            <div>
                <label>
                    <span className="font-bold opacity-66 text-xs">
                        Full Name
                    </span>
                    <span className="text-tomato">*</span>
                </label>
                <Form.Item
                    name="name"
                    rules= {[{ 
                        required: true, 
                        message: "Full name cannot be empty"
                    }]}
                    initialValue={__getUserName()}
                >
                    <Input className="border-silver font-base 
                        focus:border-limegreen focus:shadow-sm h-12
                        hover:border-silver mt-1 px-4 w-full lg:w-95" 
                        placeholder="John Doe" 
                        autoFocus
                    />
                </Form.Item>
            </div>
            <Button className="default-blue-btn filled-blue 
            btn-large mt-2 w-95" htmlType="submit" loading={isLoading}>
                Save Details
            </Button>
        </Form>
    )
}

export default UserDetails;