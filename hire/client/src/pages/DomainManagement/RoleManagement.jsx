import React, { useCallback, useEffect, useState } from "react";
import { Divider } from "antd";
import axios from "axios";
import Actionbar from "../../components/RoleManagement/Actionbar";
import EmptyState from "../../components/RoleManagement/EmptyState";
import Roles from "../../components/RoleManagement/Roles";
import RoleModal from "../../components/RoleManagement/RoleModal";
import BatchManagement from "./BatchManagement";
import Spinner from "../../components/Spinner/Spinner";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details";
import { handleError } from "../../utils/common";

const RoleManagement = (props) => {
    const { activeOid, activeOrganization, manageRole } = props;
    const defaultState = {
        activeRole: {},
        newRole: "",
        isLoading: false,
        isModalVisible: false,
        roles: []
    }
    const [state, setState] = useState(defaultState);

    const { activeRole, newRole, isLoading, isModalVisible, roles } = state;

    const getRoles = useCallback(() => {
        setState(prev => ({
            ...prev,
            isLoading: true
        }));
        axios.get(G_API_URL + "roles/", {
            params: {
                o_id: activeOid
            },
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    roles: response.roles
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
    }, [activeOid]);

    useEffect(() => {
        getRoles();
    }, [getRoles]);

    useEffect(() => {
        if(activeRole.role_id) {
            setState(prev => {
                return {
                    ...prev,
                    activeRole: roles.find(role => 
                        role.role_id === activeRole.role_id
                    )
                }
            })
        }
    }, [roles, activeRole.role_id]);

    const setModalVisible = (isModalVisible) => {
        setState(prev => ({
            ...prev,
            isModalVisible
        }));
    }

    const setNewRole = (newRole) => {
        setState(prev => ({
            ...prev,
            newRole
        }));
    }

    const setActiveRole = (activeRole = {}) => {
        setState(prev => ({
            ...prev,
            activeRole
        }));
    }

    return (
        <>
            {
                !Object.keys(activeRole).length ?
                <div className="px-12 py-8">
                    <Actionbar 
                        organizationName={activeOrganization.name} 
                        manageRole={manageRole}
                        setModalVisible={setModalVisible} 
                    />
                    <Divider />
                    {
                        !isLoading ?
                        <>
                            {
                                roles.length === 0 ?
                                <EmptyState setModalVisible={setModalVisible} /> :
                                <Roles roles={roles} setActiveRole={setActiveRole} />
                            }
                        </> :
                        <Spinner />
                    }
                    {
                        isModalVisible &&
                        <RoleModal 
                            activeOid={activeOid}
                            newRole={newRole}
                            getRoles={getRoles}
                            roles={roles}
                            setModalVisible={setModalVisible} 
                            setNewRole={setNewRole} 
                        />
                    }
                </div>:
                <BatchManagement 
                    activeRole={activeRole}
                    getRoles={getRoles}
                    setActiveRole={setActiveRole}
                />
            }
        </>
    )
}

export default RoleManagement;