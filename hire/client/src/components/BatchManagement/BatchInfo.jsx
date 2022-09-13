import React, { useState } from "react";
import { Button, Divider, Form, Input, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

import Rounds from "../BatchManagement/Rounds";
import { __getToken } from "../../utils/user-details";
import { handleError, openNotification } from "../../utils/common";
import { G_API_URL } from "../../constants/constants";
import Companyspq from "./Companyspq";

const { Option } = Select;
const { Dragger } = Upload;

const BatchInfo = (props) => {
  const {
    actionType,
    activeBatch,
    activeOid,
    activeRid,
    roleName,
    batchId,
    getRoles,
    setModalVisible,
    type,
  } = props;

  const [form] = Form.useForm();
  const [rounds, setRounds] = useState(activeBatch ? activeBatch.rounds : 0);
  const [isLoading, setLoading] = useState(false);
  // const[newrole,setNewROle]= useState(null);
  const [jobDescriptionFile, setJobDescriptionFile] = useState();
  const [newrole, setNewROle] = useState("");

  const downloadJobDescription = () => {
    axios
      .get(G_API_URL + "roles/jd", {
        params: {
          o_id: activeOid,
          role_id: activeRid,
        },
        headers: {
          Authorization: __getToken(),
        },
      })
      .then((response) => {
        response = response.data;
        if (response.status === 1) {
          // Create a blob with the data we want to download as a file
          const data = JSON.stringify(response.job_description);
          const blob = new Blob([data], { type: "text/json" });
          // Create an anchor element and dispatch a click event on it
          // to trigger a download
          const a = document.createElement("a");
          a.download = "job_description.json";
          a.href = window.URL.createObjectURL(blob);
          const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
          });
          a.dispatchEvent(clickEvt);
          a.remove();
        }
      })
      .catch((error) => {
        error = error.response;
        handleError(error);
      });
  };

  const addRole = (values) => {
    const formData = new FormData();
    formData.append("role_name", roleName);
    formData.append("o_id", activeOid);
    delete values.job_description;
    formData.append("batch", JSON.stringify(values));
    formData.append("file", jobDescriptionFile[0]);
    axios
      .post(G_API_URL + "roles/add", formData, {
        headers: {
          Authorization: __getToken(),
        },
      })
      .then((response) => {
        response = response.data;
        setLoading(false);
        if (response.status === 0) {
          openNotification("error", response.message, 2);
        } else {
          setNewROle(response.role_id);
          openNotification("success", response.message, 2);
          // getRoles();
          // setModalVisible(false);
        }
      })
      .catch((error) => {
        error = error.response;
        handleError(error);
      });
  };

  const roleCmp = () => {
    if (newrole === "") {
      openNotification("error", "first you should create or manage Test", 2);
    } else {
      getRoles();
      setModalVisible(false);
    }
  };
  const updateBatch = (values) => {
    const endpoint =
      G_API_URL + "roles/" + (!activeBatch ? "add" : "update") + "/batch";
    axios
      .post(
        endpoint,
        {
          role_id: activeRid,
          o_id: activeOid,
          batch: values,
        },
        {
          headers: {
            Authorization: __getToken(),
          },
        }
      )
      .then((response) => {
        response = response.data;
        setLoading(false);
        if (response.status === 0) {
          openNotification("error", response.message, 2);
        } else {
          getRoles();
          setModalVisible(false);
        }
      })
      .catch((error) => {
        error = error.response;
        handleError(error);
      });
  };

  const updateJobDescription = () => {
    const formData = new FormData();
    formData.append("o_id", activeOid);
    formData.append("role_id", activeRid);
    formData.append("file", jobDescriptionFile[0]);
    axios
      .post(G_API_URL + "roles/update/jd", formData, {
        headers: {
          Authorization: __getToken(),
        },
      })
      .then((response) => {
        response = response.data;
        setLoading(false);
        if (response.status === 0) {
          openNotification("error", response.message, 2);
        } else {
          setModalVisible(false);
        }
      })
      .catch((error) => {
        error = error.response;
        handleError(error);
      });
  };

  const handleFinish = (values) => {
    if (values) {
      setLoading(true);
      if (type === "role") {
        addRole(values);
      } else {
        if (actionType === 0) {
          updateBatch(values);
        } else {
          updateJobDescription();
        }
      }
    }
  };

  const draggerProps = {
    multiple: false,
    onRemove: () => {
      setJobDescriptionFile([]);
    },
    beforeUpload: (file) => {
      setJobDescriptionFile([file]);
      return false;
    },
    jobDescriptionFile,
  };

  return (
    <>
      <Form className="mt-4" form={form} onFinish={handleFinish}>
        <div className="bg-lightblue p-8 rounded">
          <h5 className="font-bold text-base">{roleName}</h5>
          {(type === "role" || actionType === 0) && (
            <>
              <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                  <span className="font-semibold text-xs opacity-66">
                    Batch Id.
                  </span>
                  <Form.Item
                    name="batch_id"
                    rules={[
                      {
                        required: true,
                        message: "Batch Id. cannot be empty",
                      },
                    ]}
                    initialValue={batchId}
                  >
                    <Input
                      className="border-silver focus:border-silver 
                                        focus:shadow-sm h-14 hover:border-silver"
                      placeholder="Product Manager"
                      disabled
                    />
                  </Form.Item>
                </div>
                <div>
                  <span className="font-semibold text-xs opacity-66">
                    No. of rounds
                  </span>
                  <Form.Item
                    name="rounds"
                    rules={[
                      {
                        required: true,
                        message: "Please select number of rounds",
                      },
                    ]}
                    initialValue={activeBatch ? activeBatch.rounds : undefined}
                  >
                    <Select
                      className="border-silver focus:border-silver 
                                        focus:shadow-sm h-14 hover:border-silver"
                      placeholder="2"
                      onChange={(value) => setRounds(value)}
                    >
                      <Option value={1}>1</Option>
                      <Option value={2}>2</Option>
                      <Option value={3}>3</Option>
                      <Option value={4}>4</Option>
                      <Option value={5}>5</Option>
                      <Option value={6}>6</Option>
                      <Option value={7}>7</Option>
                      <Option value={8}>8</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              {rounds !== 0 && (
                <Rounds activeBatch={activeBatch} rounds={rounds} form={form} />
              )}
            </>
          )}
          {(type === "role" || actionType === 1) && (
            <>
              <Divider />
              <div className="mt-8">
                <span className="font-semibold text-xs opacity-66">
                  Job Description
                </span>
                <Form.Item
                  name="job_description"
                  rules={[
                    {
                      required: true,
                      message: "Please upload a job description json file",
                    },
                  ]}
                >
                  <Dragger accept=".json" {...draggerProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p>Click or drag file to this area to upload</p>
                  </Dragger>
                </Form.Item>
                <p
                  className="cursor-pointer flex items-center justify-self-center 
                            text-bluelagoon w-max"
                  onClick={() => downloadJobDescription()}
                >
                  <i className="icon icon-download mr-2" />
                  Download Current JD/Template
                </p>
              </div>
            </>
          )}
          <Button
            className="default-blue-btn filled-blue
            ml-auto mt-8 !w-40"
            htmlType="submit"
            loading={isLoading}
          >
            {type === "batch" && actionType === 1
              ? "Update JD"
              : (!activeBatch ? "Manage" : "Update") +
                " " +
                (type === "role" ? "Test" : "Batch")}
          </Button>
        </div>
      </Form>
      {type === "role" ? (
        <Companyspq o_id={activeOid} role_id={newrole} />
      ) : null}
      {type === "role" ? (
        <Button
          className="default-blue-btn filled-blue
         ml-auto mt-8 !w-40"
          loading={isLoading}
          onClick={roleCmp}
        >
          Add Role
        </Button>
      ) : null}
    </>
  );
};

export default BatchInfo;
