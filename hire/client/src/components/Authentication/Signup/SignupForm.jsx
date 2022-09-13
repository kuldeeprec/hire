import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from "antd";

const SignupForm = (props) => {
    const { email, isLoading, signup } = props;
    const history = useHistory();
    const [form] = Form.useForm();
    return (
        <div className="mt-8 lg:mt-14">
            <h1 className="font-extrabold font-montserrat 
            text-mob-subtitle lg:text-subtitle">
                Create Account
            </h1>

            <Form className="mt-14" form={form} onFinish={signup}>
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
                        initialValue={email}
                    >
                        <Input 
                            className="border-silver font-base 
                            focus:border-limegreen focus:shadow-sm  
                            hover:border-silver mt-1 px-4 w-full lg:w-95 lowercase" 
                            placeholder="you@example.com" 
                            autoFocus
                            disabled
                        />
                    </Form.Item>
                </div>
                <div>
                    <label className="font-bold opacity-66 text-xs">
                        Full Name
                    </label>
                    <Form.Item
                        name="name"
                        rules= {[{ 
                            required: true, 
                            message: "Name cannot be empty"
                        }]}
                    >
                        <Input 
                            className="border-silver font-base 
                            focus:border-limegreen focus:shadow-sm  
                            hover:border-silver mt-1 px-4 w-full lg:w-95" 
                            placeholder="John Doe" 
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
                        }, { 
                            min: 8, 
                            message: "Password must be at least 8 characters." 
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
                    Sign Up
                </Button>
            </Form>
            <p className="mt-8 text-base text-ceruleanblue w-max">
                Already have an account? <span className="cursor-pointer 
                text-bluelagoon underline" onClick={() => history.push("/")}>
                    Sign in
                </span>
            </p>
        </div>
    )
}

export default SignupForm;