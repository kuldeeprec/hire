import React, { useState } from "react";
import { Button, Modal, Upload } from "antd";
import axios from "axios";
import { __getToken } from "../../utils/user-details";
import { handleError, openNotification } from "../../utils/common";
import { G_API_URL, G_S3_URL } from "../../constants/constants";

const UploadModal = (props) => {
  const { activeBatch, setModalVisible } = props;

  const defaultState = {
    fileList: [],
    isLoading: false,
  };

  const [state, setState] = useState(defaultState);

  const { fileList, isLoading } = state;

  const uploadProps = {
    onRemove: () => {
      setState((prev) => ({
        ...prev,
        fileList: [],
      }));
    },
    beforeUpload: (file) => {
      setState((prev) => ({
        ...prev,
        fileList: [file],
      }));
      return false;
    },
    fileList,
  };

  const download = () => {
    window.open(G_S3_URL + "recruit/typeform_template.xlsx", "_self");
  };

  const update = () => {
    if (fileList.length) {
      setState((prev) => ({
        ...prev,
        isLoading: true,
      }));
      const formData = new FormData();
      formData.append("batch_id", activeBatch.batch_id);
      formData.append("o_id", activeBatch.o_id);
      formData.append("role_id", activeBatch.role_id);
      formData.append("file", fileList[0]);
      axios
        .post(G_API_URL + "typeform/logs", formData, {
          headers: {
            Authorization: __getToken(),
          },
        })
        .then((response) => {
          response = response.data;
          setTimeout(() => {
            setState((prev) => ({
              ...prev,
              isLoading: false,
            }));

            if (response.status === 1) {
              openNotification("success", response.message, 3);
              setModalVisible(false);
            } else {
              openNotification("error", response.message, 3);
            }
          }, 800);
        })
        .catch((error) => {
          error = error.response;
          handleError(error);
        });
    } else {
      openNotification("error", "Please upload a file", 3);
    }
  };

  return (
    <>
      <Modal
        closable={false}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setModalVisible(false)}
        title=""
        visible={true}
        width={444}
      >
        <div className="p-2">
          <div className="flex justify-between">
            <h1 className="font-semibold text-xl">Typeform Data</h1>
            <i
              className="bg-silver cursor-pointer font-semibold 
                        icon icon-x px-1.5 py-0.5 rounded-full text-base"
              onClick={() => setModalVisible(false)}
            />
          </div>

          <div className="flex flex-col items-center p-8 bg-lightblue mt-8">
            <Upload
              className="flex flex-col items-center 
                        w-full"
              {...uploadProps}
            >
              <Button className="default-blue-btn filled-blue w-3/5">
                <i className="icon icon-upload font-bold" />
                &nbsp; Upload Data
              </Button>
            </Upload>
            <p
              className="cursor-pointer flex items-center justify-self-center 
                        text-bluelagoon mt-6 w-max"
              onClick={() => download()}
            >
              <i className="icon icon-download mr-2" />
              Download Template
            </p>
          </div>

          <Button
            className="default-blue-btn filled-blue mt-8 ml-auto"
            loading={isLoading}
            onClick={() => update()}
          >
            Update
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UploadModal;
