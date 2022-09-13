import React from "react";
import { Modal } from "antd";
import BatchInfo from "./BatchInfo";

const BatchModal = (props) => {
    const { activeBatch, activeRole, actionType, getRoles, setModalVisible } = props;
    const batchId = activeBatch ? activeBatch.batch_id : activeRole.batches.length + 1;
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
            <div className="p-2">
                <BatchInfo 
                    actionType={actionType}
                    activeBatch={activeBatch}
                    activeOid={activeRole.o_id}
                    activeRid={activeRole.role_id}
                    roleName={activeRole.role_name}
                    batchId={batchId}
                    getRoles={getRoles}
                    setModalVisible={setModalVisible}
                    type={"batch"}
                />
            </div>
        </Modal>
    )
}

export default BatchModal;