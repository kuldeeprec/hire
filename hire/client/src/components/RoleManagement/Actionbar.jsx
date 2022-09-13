import React from "react";
import { Button } from "antd";

const Actionbar = (props) => {
    const { organizationName, manageRole, setModalVisible } = props;
    return (
        <div className="flex justify-between">
            <div className="flex items-center">
                <i className="cursor-pointer icon icon-arrow-left text-xl mr-8"
                onClick={() => manageRole() } />
                <h1 className="text-2xl">
                    <span className="font-bold text-bluelagoon">
                        Role Management
                    </span>&nbsp;
                    <span>{ organizationName }</span>
                </h1>
            </div>
            <div className="flex items-center">
                <Button className="default-blue-btn filled-blue
                ml-4" onClick={() => setModalVisible(true)}>
                    Add a Role
                    <i className="icon icon-plus text-xl mr-1" />
                </Button>
            </div>
        </div>
    )
}

export default Actionbar;