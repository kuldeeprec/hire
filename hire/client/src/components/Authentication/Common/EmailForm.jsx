import React from "react";
import { Button, Form, Input } from "antd";

const EmailForm = (props) => {

    const { formRef, handleFinish, handleKeyUp, isLoading } = props;

    const [form] = Form.useForm();

    return (
        <Form className="mt-14 w-full lg:w-max" form={form} 
        onFinish={handleFinish} onKeyUp={handleKeyUp} ref={formRef}>
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
                        hover:border-silver mt-1 px-4 w-full lg:w-95" 
                        placeholder="you@example.com" 
                        autoFocus
                    />
                </Form.Item>
            </div>
            <Button className="default-blue-btn filled-blue 
            btn-large mt-8" htmlType="submit" loading={isLoading}>
                Continue
            </Button>
        </Form>
    )
}

export default EmailForm;