import React from "react";
import { Button, Form, Input } from "antd";

const RoleManagement = (props) => {
    const { roleManagementFormRef } = props;
    const [form] = Form.useForm();
    return (
        <>
            <div>
                <h1 className="font-semibold text-2xl">
                    Role Management
                </h1>
                <div className="mt-8">
                    <span className="font-semibold text-xs opacity-66">
                        Roles
                    </span>
                    <Form className="flex gap-6 mt-1"
                    form={form} ref={roleManagementFormRef}>
                        <Form.Item
                            className="w-11/12"
                            name="email"
                            rules= {[{ 
                                required: true,
                                type: "email", 
                                message: "Please enter a valid email"
                            }]}
                        >
                            <Input className="border-silver focus:border-silver 
                                focus:shadow-sm h-14 hover:border-silver" 
                                placeholder="Product Manager" 
                            />
                        </Form.Item>
                        <Button className="h-14 border-0 !bg-bluelagoon rounded-sm w-14" 
                        onClick={() => roleManagementFormRef.current.submit()}>
                            <i className="icon icon-plus text-2xl !text-dove" />
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default RoleManagement;