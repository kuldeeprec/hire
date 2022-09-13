import React from "react";
import { ReactComponent as RoleManagementVector } from 
"../../assets/imgs/role-management/role-management.svg";

const EmptyState = (props) => {
    const { setModalVisible } = props;
    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <RoleManagementVector />
            <p className="text-bluelagoon mt-4">
                You have’nt added a role yet , <b className="underline 
                cursor-pointer" onClick={() => setModalVisible(true)}>
                Lets add one</b>
            </p>
        </div>
    )
}

export default EmptyState;