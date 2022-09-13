import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { Button, Form, Input, Table } from "antd";
import axios from "axios";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details";
import { handleError, openNotification } from "../../utils/common";

const InviteAdmins = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        getExistingInvitees
    }));

    const [form] = Form.useForm();
    const { activeOid, addUser, inviteFormRef, removeUser, users } = props;
    const [isLoading, setLoading] = useState(false);
    const [existingInvitees, setExistingInvitees] = useState([]);

    const getExistingInvitees = useCallback(() => {
        setLoading(true);
        axios.get(G_API_URL + "ogn/users", {
            params: {
                id: activeOid
            },
            headers: {
                Authorization: __getToken()
            }
        }).then(response => {
            response = response.data;
            if(response.status === 1) {
                setTimeout(() => {
                    setLoading(false);
                    setExistingInvitees(response.users);
                }, 500);
            } else {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }).catch(error => {
            error = error.response;
            handleError(error);
        });
    }, [activeOid]);

    useEffect(() => {
        getExistingInvitees();
    }, [getExistingInvitees]);

    const updateStatus = (user, status) => {
        if(user.is_new) {
            removeUser(user.email);
        } else {
            axios.put(G_API_URL + "users/update/status", {
                invitation_status: user.invitation_status,
                o_id: activeOid,
                user_id: user.uid,
                status
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                if(response.status === 1) {
                    getExistingInvitees()
                } else {
                    openNotification("error", response.message, 2);
                }
            }).catch(error => {
                error = error.response;
                handleError(error);
            });
        }
    }

    const resendInvitation = (receiver_id) => {
        axios.post(G_API_URL + "users/resend/invitation", {
            receiver_id,
            o_id: activeOid
        }, {
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                openNotification("success", response.message, 2);
            } else {
                openNotification("error", response.message, 2);
            }
        }).catch((error) => {
            error = error.response;
            handleError(error);
        });
    }

    const handleFinish = (values) => {
        if(values) {
            const isExistingUser = existingInvitees.find(invitee => 
                invitee.email === values.email
            );
            if(!isExistingUser) {
                addUser(values);
            }
        }
    }

    const dataSource = [
        ...existingInvitees,
        ...users.map(email => ({
            email,
            status: "Pending",
            is_new: true
        }))
    ];
      
    const columns = [
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Action',
          key: 'action',
          render: (user) => <>
           {
               user.status === "Pending" ?
               <div>
                   <span className="cursor-pointer" 
                   onClick={() => updateStatus(user, 0)}>Revoke</span> 
                   { 
                        !user.is_new &&
                        <>
                            &nbsp;|&nbsp;
                            <span className="cursor-pointer" 
                            onClick={() => resendInvitation(user.uid)}>
                                Resend
                            </span>
                        </>
                   }
               </div> : 
                <span className="cursor-pointer" onClick={() => 
                updateStatus(user, user.status === "Joined" ? 0 : 1)}>
                    { user.status === "Joined" ? "Deactivate" : "Activate" }
                </span>
           }
          </>
        },
    ];

    return (
        <div>
            <span className="font-semibold text-xs opacity-66">
                Invite Admins
            </span>
            <Form className="flex gap-6 mt-1" onFinish={handleFinish}
            form={form} ref={inviteFormRef}>
                <Form.Item
                    className="w-11/12"
                    name="email"
                    rules= {[{ 
                        required: true,
                        type: "email", 
                        message: "Please enter a valid email"
                    }]}
                >
                    <Input className="border-silver focus:border-silver 
                        focus:shadow-sm h-14 hover:border-silver" 
                        placeholder="xyz@prograd.org.in" 
                    />
                </Form.Item>
                <Button className="h-14 border-0 bg-bluelagoon focus:bg-bluelagoon 
                hover:bg-bluelagoon rounded-sm w-14" onClick={() => 
                inviteFormRef.current.submit()}>
                    <i className="icon icon-plus text-2xl text-dove" />
                </Button>
            </Form>
            <Table dataSource={dataSource} columns={columns} className="mt-4"
            loading={isLoading} />
        </div>
    )
})

export default InviteAdmins;