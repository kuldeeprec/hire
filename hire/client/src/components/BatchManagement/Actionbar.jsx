import React from "react";
import { Button } from "antd";
const Actionbar = (props) => {
  const { roleName, setActiveRole, setModalVisible, updateJD } = props;
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <i
          className="cursor-pointer icon icon-arrow-left text-xl mr-8"
          onClick={() => setActiveRole()}
        />
        <h1 className="text-2xl">
          <b className="text-bluelagoon">Batch Management</b>&nbsp;
          <span>{roleName}</span>
        </h1>
      </div>
      <div className="flex items-center">
        <Button
          className="default-blue-btn filled-blue"
          onClick={() => updateJD()}
        >
          Update JD
        </Button>
        <Button
          className="default-blue-btn filled-blue
                ml-4"
          onClick={() => setModalVisible(true)}
        >
          Add a Batch
          <i className="icon icon-plus text-xl mr-1" />
        </Button>
      </div>
    </div>
  );
};

export default Actionbar;
