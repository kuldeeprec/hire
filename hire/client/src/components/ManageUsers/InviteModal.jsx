import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details";
import { handleError } from "../../utils/common";

const InviteModal = (props) => {
    const { getUsers, isModalVisible, setModalVisible } = props;

    const defaultState = {
        users: [],
        isLoading: false
    }

    const [form] = Form.useForm();
    const formRef = React.createRef();
    const [state, setState] = useState(defaultState);

    const { users, isLoading } = state;

    const addUser = (user) => {
        if(user) {
            if(formRef && formRef.current) {
                formRef.current.resetFields();
            }
            setState(prev => ({
                ...prev,
                users: [...new Set([...users, user.email])]
            }));
        }
    }

    const removeUser = (removedUser) => {
        setState(prev => ({
            ...prev,
            users: users.filter(user => user !== removedUser)
        }));
    }
    

    const renderUsers = () => {
        return users.map((user, key) => 
            <div className="bg-lightblue border border-bluelagoon flex
            items-center justify-between p-4 rounded-sm" key={key}>
                <div>{ user }</div>
                <div className="flex items-center justify-center border-2 
                border-tomato cursor-pointer rounded-full h-5 w-5"
                onClick={() => removeUser(user)}>
                    <i className="icon icon-x text-sm font-semibold 
                    text-tomato" />
                </div>
            </div>
        );
    }

    const inviteUsers = () => {
        if(users.length) {
            setState(prev => ({
                ...prev,
                isLoading: true
            }));
            axios.post(G_API_URL + "users/invite", {
                emails: users
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then((response) => {
                response = response.data;
                if(response.status === 1) {
                    setState(prev => ({
                        ...prev,
                        users: [],
                        isLoading: false
                    }));
                    setModalVisible(false);
                    getUsers();
                } else {
                    setState(prev => ({
                        ...prev,
                        isLoading: false
                    }));
                }
            }).catch((error) => {
                error = error.response;
                handleError(error);
            });
        }
    }

    return (
        <>
            <Modal
                closable={false}
                destroyOnClose={true}
                footer={null}
                onCancel={() => setModalVisible(false)}
                title=""
                visible={isModalVisible}
                width={664}
            >
                <div className="p-2">
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-2xl">
                            Add Super Admins
                        </h1>
                        <i className="bg-silver cursor-pointer font-semibold 
                        icon icon-x px-1.5 py-0.5 rounded-full text-lg" 
                        onClick={() => setModalVisible(false)} />
                    </div>
                    <div className="mt-8">
                        <span className="font-semibold text-xs opacity-66">
                            Enter Email
                        </span>
                        <Form className="flex gap-6" onFinish={addUser}
                        form={form} ref={formRef}>
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
                                    focus:shadow-sm h-12 hover:border-silver" 
                                    placeholder="xyz@prograd.org.in" 
                                />
                            </Form.Item>
                            <Button className="h-12 border-0 bg-bluelagoon 
                            hover:bg-bluelagoon focus:bg-bluelagoon 
                            rounded-sm" htmlType="submit">
                                <i className="icon icon-plus text-xl text-dove" />
                            </Button>
                        </Form>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        { renderUsers() }
                    </div>
                    <Button className="default-blue-btn btn-large filled-blue
                    mt-8 ml-auto" loading={isLoading} onClick={() => inviteUsers()}>
                        Invite
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default InviteModal;