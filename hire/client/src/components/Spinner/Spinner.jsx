import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const spinIcon = (
    <LoadingOutlined 
        style={{ 
            fontSize: 56, 
            color: "var(--bluelagoon)" 
        }}
        spin 
    />
);

const Spinner = () => {
    return (
        <div className="grid justify-center my-64">
            <Spin indicator={spinIcon} />
        </div>
    )
}

export default Spinner;