import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import InviteAdmins from "./InviteAdmins";
import Spinner from "../../components/Spinner/Spinner";
import { G_PORTAL_DOMAIN, G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details";
import { handleError } from "../../utils/common";

const DomainModal = (props) => {
    const { activeOid, getDomains, manageRole, setActiveOid, setModalVisible } = props;
    const defaultState = {
        isLoading: false,
        isUpdating: false,
        organization: {},
        users: []
    }
    const [state, setState] = useState(defaultState);
    const [form] = Form.useForm();
    const InviteAdminsRef = useRef();
    const inviteFormRef = React.createRef();
    const { isLoading, isUpdating, organization, users } = state;

    const isEditing = activeOid || Object.keys(organization).length > 0;

    useEffect(() => {
        if(activeOid) {
            setState(prev => ({
                ...prev,
                isLoading: true
            }));
            axios.get(G_API_URL + "ogn/info", {
                params: {
                    id: activeOid
                },
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                if(response.status === 1) {
                    setState(prev => ({
                        ...prev,
                        isLoading: false,
                        organization: response.organization
                    }));
                } else {
                    setState(prev => ({
                        ...prev,
                        isLoading: false
                    }));
                }
            }).catch(error => {
                error = error.response;
                handleError(error);
            });
        }
    }, [activeOid]);

    const addUser = (user) => {
        if(inviteFormRef && inviteFormRef.current) {
            inviteFormRef.current.resetFields();
        }
        setState(prev => ({
            ...prev,
            users: [...new Set([...users, user.email])]
        }));
    }

    const removeUser = (removedUser) => {
        setState(prev => ({
            ...prev,
            users: users.filter(user => user !== removedUser)
        }));
    }

    const updateDomain = (values) => {
        if(values) {
            const endpoint = G_API_URL + "ogn/" + (!isEditing ? "add" : "update");

            setState(prev => ({
                ...prev,
                isUpdating: true
            }));

            axios.post(endpoint, {
                ...values,
                emails: users,
                ...(isEditing ? { id: organization.id } : {})
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then((response) => {
                response = response.data;
                if(response.status === 1) {
                    setState(prev => ({
                        ...prev,
                        isUpdating: false,
                        organization: response.organization,
                        users: []
                    }));
                    if(!isEditing) {
                        getDomains();
                        setActiveOid(response.organization.id);
                    }
                    InviteAdminsRef.current.getExistingInvitees();
                } else {
                    setState(prev => ({
                        ...prev,
                        isUpdating: false
                    }));
                }
            }).catch((error) => {
                error = error.response;
                handleError(error);
            });
        }
    }

    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            footer={null}
            onCancel={() => setModalVisible(false)}
            title=""
            visible={true}
            width={664}
        >
            {
                !isLoading ?
                <div className="p-2">
                    <div className="flex justify-between">
                        <h1 className="font-semibold text-2xl">
                            { !isEditing ? "Add a New Domain" : "Edit Domain" }
                        </h1>
                        <i className="bg-silver cursor-pointer font-semibold 
                        icon icon-x px-1.5 py-0.5 rounded-full text-lg" 
                        onClick={() => setModalVisible(false)} />
                    </div>
                    <Form className="mt-8" form={form} onFinish={updateDomain}>
                        <div className="grid grid-cols-2 gap-12">
                            <div>
                                <span className="font-semibold text-xs opacity-66">
                                    Organization name
                                </span>
                                <Form.Item
                                    name="name"
                                    rules={[{ required: true, message: 'Organization name is required' }]}
                                    initialValue={organization.name}
                                >
                                    <Input 
                                        className="mt-1 border border-silver rounded-sm p-4 text-sm" 
                                        placeholder="Prograd" 
                                    />
                                </Form.Item>
                            </div>
                            <div>
                                <span className="font-semibold text-xs opacity-66">
                                    Organisation’s  URL
                                </span>
                                <Form.Item
                                    name="domain"
                                    rules={[{ required: true, message: 'Organization name is required' }]}
                                    initialValue={organization.domain}
                                >
                                    <Input 
                                        className="mt-1 border border-silver rounded-sm p-4 text-sm" 
                                        placeholder="prograd" 
                                        suffix={G_PORTAL_DOMAIN}
                                        disabled={activeOid}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <InviteAdmins activeOid={activeOid} addUser={addUser} 
                        inviteFormRef={inviteFormRef} removeUser={removeUser} 
                        ref={InviteAdminsRef} users={users} />
                        <div className="flex justify-end">
                            <Button className={`default-blue-btn btn-large ${ isEditing ? "filled-blue" : 
                            "bg-silver border-silver text-dove hover:bg-silver hover:border-silver hover:text-dove" } mt-8`}
                            onClick={() => manageRole(organization, 1)}>
                                Manage Roles
                            </Button>
                            <Button className="default-blue-btn btn-large filled-blue 
                            ml-8 mt-8" htmlType="submit" loading={isUpdating}>
                                { !isEditing? "Add" : "Update" } Domain
                            </Button>
                        </div>
                    </Form>
                </div> :
                <Spinner />
            }
        </Modal>
    )
}

export default DomainModal;