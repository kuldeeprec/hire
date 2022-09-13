import React from "react";
import { ReactComponent as RoleManagementVector } from 
"../../assets/imgs/role-management/role-management.svg";

const EmptyState = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <RoleManagementVector />
            <p className="text-bluelagoon mt-4">
                You have’nt added a batch yet , <b className="underline 
                cursor-pointer">Lets add one</b>
            </p>
        </div>
    )
}

export default EmptyState;