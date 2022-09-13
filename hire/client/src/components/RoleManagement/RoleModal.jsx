import React from "react";
import { Button, Form, Input, Modal } from "antd";
import BatchInfo from "../BatchManagement/BatchInfo";

const RoleModal = (props) => {
  const { activeOid, newRole, getRoles, roles, setModalVisible, setNewRole } =
    props;
  const [form] = Form.useForm();
  const isEditing = false;

  const handleFinish = (values) => {
    if (values) {
      setNewRole(values.role);
    }
  };

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
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl">
            {!isEditing ? "Add a New Role" : "Edit Role"}
          </h1>
          <i
            className="bg-silver cursor-pointer font-semibold 
                    icon icon-x px-1.5 py-0.5 rounded-full text-lg"
            onClick={() => setModalVisible(false)}
          />
        </div>
        {!newRole ? (
          <div className="mt-8">
            <span className="font-semibold text-xs opacity-66">Role</span>
            <Form
              className="flex gap-6 mt-1"
              form={form}
              onFinish={handleFinish}
            >
              <Form.Item
                className="w-11/12"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid role",
                  },
                  () => ({
                    validator(_, value) {
                      if (value) {
                        const roleNameExists = roles.find(
                          (role) =>
                            role.role_name.toLowerCase() === value.toLowerCase()
                        );
                        if (roles.length === 0 || !roleNameExists) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Role with same name already exists")
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <Input
                  className="border-silver focus:border-silver 
                                    focus:shadow-sm h-14 hover:border-silver"
                  placeholder="Product Manager"
                />
              </Form.Item>
              <Button
                className="h-14 border-0 bg-bluelagoon 
                            hover:bg-bluelagoon focus:bg-bluelagoon rounded-sm 
                            w-14"
                htmlType="submit"
              >
                <i
                  className="icon icon-arrow-right text-2xl 
                                text-dove"
                />
              </Button>
            </Form>
          </div>
        ) : (
          <BatchInfo
            activeOid={activeOid}
            roleName={newRole}
            batchId={1}
            getRoles={getRoles}
            setModalVisible={setModalVisible}
            type={"role"}
          />
        )}
      </div>
    </Modal>
  );
};

export default RoleModal;
