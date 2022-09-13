import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { Switch, Table } from "antd";
import { G_API_URL } from "../../constants/constants";
import { __getUID, __getToken } from "../../utils/user-details";
import { handleError, openNotification } from "../../utils/common";
import Actionbar from "../../components/ManageUsers/Actionbar";
import InviteModal from "../../components/ManageUsers/InviteModal";
import Layout from "../../components/Layout/Layout";

const ManageUsers = () => {
    const uid = __getUID();

    const defaultState = {
        activeUser: -1,
        isLoading: false,
        isModalVisible: false,
        users: []
    }

    const [state, setState] = useState(defaultState);

    const { activeUser, isLoading, isModalVisible, users } = state;

    const getUsers = useCallback(() => {
        setState(prev => ({
            ...prev,
            isLoading: true
        }));
        axios.get(G_API_URL + "users/", {
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        users: response.users,
                        isLoading: false
                    }));
                }, 500);
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
    }, []);

    const resendInvitation = (receiver_id) => {
        axios.post(G_API_URL + "users/resend/invitation", {
            receiver_id
        }, {
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                openNotification("success", response.message, 2);
            } else {
                openNotification("error", response.message, 2);
            }
        }).catch((error) => {
            error = error.response;
            handleError(error);
        });
    }

    const updateStatus = (invitation_status, activeUser, status) => {
        setState(prev => ({
            ...prev,
            activeUser,
            isUpdating: true
        }));
        axios.put(G_API_URL + "users/update/status", {
            invitation_status,
            user_id: activeUser,
            status
        }, {
            headers: {
                Authorization: __getToken()
            }
        }).then(response => {
            response = response.data;
            if(response.status === 1) {
                setTimeout(() => {
                    setState(prev => ({
                        ...prev,
                        activeUser: -1,
                        users: response.users
                    }));
                }, 1000);
            } else {
                setState(prev => ({
                    ...prev,
                    activeUser: -1
                }));
            }
        }).catch(error => {
            error = error.response;
            handleError(error);
        });
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            key: 'status',
            render: (user) => ( 
                <div className="flex items-center">
                    { user.status }
                    { user.status === "Pending" ? <i className="cursor-pointer icon 
                    icon-refresh-cw ml-3 text-bluelagoon text-base" 
                    onClick={() => resendInvitation(user.uid)} /> : "" }
                </div>
            )
        },
        {
            title: 'Last Active',
            dataIndex: 'last_active',
            key: 'last_active',
        },
        {
            title: '',
            key: 'state',
            render: (user) => (
                user.uid !== uid && <Switch checked={user.state} 
                loading={ user.uid === activeUser } onClick={() => 
                    updateStatus(user.invitation_status, user.uid, user.state ? 0 : 1) 
                } />
            )
        }
    ];

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const setModalVisible = (value) => {
        setState(prev => ({
            ...prev,
            isModalVisible: value
        }))
    }

    return (
        <Layout>
            <div className="px-12 py-8">
                <Actionbar 
                    setModalVisible={setModalVisible} 
                />
                <Table 
                    className="py-4" 
                    dataSource={users} 
                    columns={columns} 
                    loading={isLoading}
                />
                <InviteModal
                    getUsers={getUsers}
                    isModalVisible={isModalVisible}
                    setModalVisible={setModalVisible}
                />
            </div>
            <style jsx={"true"}>{`
                .ant-switch-loading-icon.anticon {
                    top: -5px;
                    left: -5px;
                    color: var(--carbon);
                }
            `}</style>
        </Layout>
    )
}

export default ManageUsers;