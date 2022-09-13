import React, { useState } from "react";
import { Divider } from "antd";
import Actionbar from "../../components/BatchManagement/Actionbar";
import EmptyState from "../../components/BatchManagement/EmptyState";
import Batches from "../../components/BatchManagement/Batches";
import BatchModal from "../../components/BatchManagement/BatchModal";

const BatchManagement = (props) => {
    const { activeRole, getRoles, setActiveRole } = props;
    const defaultState = {
        activeBatch: undefined,
        actionType: 0,
        isModalVisible: false
    }
    const [state, setState] = useState(defaultState);
    const { activeBatch, actionType, isModalVisible } = state;

    const setModalVisible = (isModalVisible) => {
        setState(prev => ({
            ...prev,
            ...(!isModalVisible && {
                activeBatch: undefined,
                actionType: 0,
            }),
            isModalVisible
        }));
    }

    const editBatch = (activeBatch) => {
        setState(prev => ({
            ...prev,
            activeBatch,
            isModalVisible: true
        }));
    }

    const updateJD = () => {
        setState(prev => ({
            ...prev,
            actionType: 1,
            isModalVisible: true
        }));
    }

    return (
        <div className="px-12 py-8">
            <Actionbar 
                roleName={activeRole.role_name}
                setActiveRole={setActiveRole} 
                setModalVisible={setModalVisible}
                updateJD={updateJD}
            />
            <Divider />
            {
                !activeRole.batches.length ?
                <EmptyState /> :
                <Batches 
                    batches={activeRole.batches} 
                    editBatch={editBatch} 
                />
            }
            {
                isModalVisible &&
                <BatchModal 
                    activeBatch={activeBatch}
                    activeRole={activeRole} 
                    actionType={actionType}
                    getRoles={getRoles}
                    setModalVisible={setModalVisible}
                />
            }
        </div>
    )
}

export default BatchManagement;