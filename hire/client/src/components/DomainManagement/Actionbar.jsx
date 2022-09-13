import React from "react";
import { Button } from "antd";

const Actionbar = (props) => {
    const { setModalVisible } = props;
    return (
        <>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <h1 className="font-bold text-2xl text-bluelagoon">
                        Domain Management
                    </h1>
                </div>
                <div className="flex items-center">
                    <Button className="default-blue-btn filled-blue
                    ml-4" onClick={() => setModalVisible(true)}>
                        Add a Domain
                        <i className="icon icon-plus text-xl mr-1" />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Actionbar;