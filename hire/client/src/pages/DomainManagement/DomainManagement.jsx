import React, { useCallback, useEffect, useState } from "react";
import { Table, Switch } from "antd";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import Actionbar from "../../components/DomainManagement/Actionbar";
import DomainModal from "../../components/DomainManagement/DomainModal";
import RoleManagement from "./RoleManagement";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details";
import { handleError, openNotification } from "../../utils/common";

const DomainManagement = () => {
    const defaultState = {
        activeOid: "",
        activeOrganization: {},
        isLoading: false,
        isUpdating: false,
        isModalVisible: false,
        organizations: [],
        status: 0,
        updatedOid: ""
    }

    const setActiveOid = (activeOid) => {
        setState(prev => ({ 
            ...prev, 
            activeOid
        }));
    }

    const editDomain = (activeOid) => {
        setState(prev => ({ 
            ...prev, 
            activeOid, 
            isModalVisible: true
        }));
    }

    const [state, setState] = useState(defaultState);

    const { 
        activeOid,
        activeOrganization,
        isLoading,
        isModalVisible, 
        organizations, 
        status,
        updatedOid,
    } = state;

    const getDomains = useCallback(() => {
        setState(prev => ({
            ...prev,
            isLoading: true
        }));
        axios.get(G_API_URL + "ogn/", {
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    organizations: response.organizations
                }));
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

    useEffect(() => {
        getDomains();
    }, [getDomains]);

    const updateStatus = (id, status) => {
        setState(prev => ({
            ...prev,
            updatedOid: id
        }));
        axios.put(G_API_URL + "ogn/update/status", {
            id,
            status
        }, {
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            setTimeout(() => {
                setState(prev => ({
                    ...prev,
                    updatedOid: ""
                }));
                if(response.status === 1) {
                    openNotification("success", response.message, 2);
                    getDomains();
                } else {
                    openNotification("error", response.message, 2);
                }
            }, 800);
        }).catch((error) => {
            error = error.response;
            handleError(error);
        });
    }

    const setModalVisible = () => {
        setState(prev => ({
            ...prev,
            activeOid: "",
            isModalVisible: !isModalVisible
        }));
    }

    const manageRole = (activeOrganization = {}, status = 0) => {
        setState(prev => ({
            ...prev,
            activeOrganization,
            status
        }));
    }

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Link/Domain',
            dataIndex: 'domain',
            key: 'domain'
        },
        {
            title: 'Last Modified',
            dataIndex: 'last_modified',
            key: 'last_modified'
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles'
        },
        {
            title: '',
            key: 'status',
            render: ({ id, status }) => (
                <Switch checked={status} loading={id === updatedOid} 
                onChange={() => updateStatus(id, status ? 0 : 1)}/>
            )
        },
        {
            title: '',
            key: 'edit',
            render: (organization) => <i className="icon icon-edit text-xl 
            cursor-pointer" onClick={() => editDomain(organization.id) } />
        }
    ];

    return (
        <Layout>
            {
                status === 0 ?
                <div className="px-12 py-8">
                    <Actionbar 
                        setModalVisible={setModalVisible}
                    />
                    <Table 
                        dataSource={organizations} 
                        columns={columns} 
                        className="mt-8"
                        loading={isLoading}
                    />
                    {
                        isModalVisible &&
                        <DomainModal
                            activeOid={activeOid} 
                            getDomains={getDomains}
                            manageRole={manageRole}
                            setActiveOid={setActiveOid}
                            setModalVisible={setModalVisible}
                        />
                    }
                </div> : 
                <RoleManagement 
                    activeOid={activeOid}
                    activeOrganization={activeOrganization}
                    manageRole={manageRole}
                />
            }
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

export default DomainManagement;