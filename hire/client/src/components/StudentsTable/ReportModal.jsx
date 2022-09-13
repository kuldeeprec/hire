import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber, Modal } from "antd";
import ReactQuill from "react-quill";
import ReactParser from "html-react-parser";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import Spinner from "../../components/Spinner/Spinner";
import { handleError, openNotification } from "../../utils/common";
import { __getToken } from "../../utils/user-details";
import { G_API_URL } from "../../constants/constants";

const ReportModal = (props) => {
    const { activeReport, getReports, setActiveReport } = props;

    const defaultState = {
        isEditing: false,
        isLoading: false,
        isSaving: false,
        report: activeReport
    }

    useEffect(() => {
        if(activeReport.type === 3) {
            setState(prev => ({
                ...prev,
                isLoading: true
            }));
            axios.get(G_API_URL + "notes/", {
                params: {
                    o_id: activeReport.o_id,
                    role_id: activeReport.role_id,
                    batch_id: activeReport.batch_id,
                    round: activeReport.round,
                    email: activeReport.email
                },
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                setTimeout(() => {
                    if(response.status === 1) {
                        setState(prev => ({
                            ...prev,
                            report: response.data,
                            isLoading: false
                        }));
                    } else {
                        setState(prev => ({
                            ...prev,
                            isEditing: true,
                            isLoading: false
                        }));
                    }
                }, 800);
            }).catch(error => {
                error = error.response;
                handleError(error);
            });
        }
    }, [activeReport]);

    const [state, setState] = useState(defaultState);

    const { isEditing, isLoading, isSaving, report } = state;

    const [form] = Form.useForm();

    const copyRecordingLink = () => {
        navigator.clipboard.writeText(report.recording);
        openNotification("success", "Link copied to clipboard", 2);
    }

    const watchInterview = () => {
        window.open(report.recording, "_blank");
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'width'
    ];

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
        ]
    };

    const handleFinish = (values) => {
        if(values) {
            setState(prev => ({
                ...prev,
                isSaving: true
            }));
            axios.post(G_API_URL + "notes/save", {
                ...activeReport,
                ...values
            }, {
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                if(response.status === 1) {
                    getReports();
                    setState(prev => ({
                        ...prev,
                        isSaving: false,
                        isEditing: false,
                        report: response.data
                    }));
                } else {
                    setState(prev => ({
                        ...prev,
                        isSaving: false
                    }));
                }
            }).catch(error => {
                error = error.response;
                handleError(error);
            });
        }
    }

    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            footer={null}
            onCancel={() => setActiveReport()}
            title=""
            visible={true}
            width={664}
        >
            <div className="p-2">
                <div className="flex justify-end">
                    <i className="bg-silver cursor-pointer font-semibold 
                    icon icon-x px-1.5 py-0.5 rounded-full text-lg" 
                    onClick={() => setActiveReport()} />
                </div>
                {
                    report.type === 2 ?
                    <div>
                        <h3 className="font-bold text-lg uppercase">
                            Remarks
                        </h3>
                        <p className="text-sm mt-2 whitespace-pre-wrap">
                            { report.remarks }
                        </p>
                        <h3 className="font-bold text-lg uppercase mt-8">
                            Recorded Interview
                        </h3>
                        <p className="flex mt-2">
                            <span className="cursor-pointer flex items-center
                            hover:text-bluelagoon" onClick={() => watchInterview()}>
                                <i className="icon icon-play-circle font-bold text-xl" /> &nbsp;
                                <span className="text-base">Watch</span>
                            </span>
                            <span className="cursor-pointer flex items-center ml-6
                            hover:text-bluelagoon" onClick={() => copyRecordingLink()}>
                                <i className="icon icon-copy font-bold text-xl" /> &nbsp;
                                <span className="text-base">Copy</span>
                            </span>
                        </p>
                    </div> : 
                    <>
                        {
                            !isLoading ?
                            <div>
                                {
                                    isEditing ?
                                    <Form form={form} onFinish={handleFinish}>
                                        <div>
                                            <label className="font-bold opacity-66 text-xs">
                                                Score
                                            </label>
                                            <Form.Item
                                                name="score"
                                                rules= {[{ 
                                                    required: true, 
                                                    message: "Score cannot be empty"
                                                }]}
                                                initialValue={report.score}
                                                className="mt-1"
                                            >
                                                <InputNumber
                                                    className="border-silver focus:border-silver 
                                                    focus:shadow-sm h-14 w-full hover:border-silver"
                                                    controls={false} 
                                                    placeholder="85" 
                                                    min={0}
                                                    max={100}
                                                />
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <label className="font-bold opacity-66 text-xs">
                                                Remarks
                                            </label>
                                            <Form.Item
                                                name="remarks"
                                                rules= {[{ 
                                                    required: false, 
                                                    message: "Remarks cannot be empty"
                                                }]}
                                                initialValue={report.remarks}
                                                className="mt-1"
                                            >
                                                <ReactQuill 
                                                    className="rounded-sm w-full remarks-editor"
                                                    formats={formats}
                                                    modules={modules}
                                                    placeholder="Enter custom instructions"
                                                />
                                            </Form.Item>
                                        </div>
                                        <Button className="h-14 border-0 default-blue-btn 
                                        filled-blue hover:bg-bluelagoon focus:bg-bluelagoon 
                                        mt-8 ml-auto rounded-sm w-14" htmlType="submit"
                                        loading={isLoading}>
                                            Save
                                        </Button>
                                    </Form> :
                                    <>
                                        <h3 className="font-bold text-lg uppercase">
                                            Remarks
                                        </h3>
                                        <p className="text-sm mt-2 whitespace-pre-wrap">
                                            { report.remarks && ReactParser(report.remarks) }
                                        </p>
                                        <Button className="h-14 border-0 default-blue-btn 
                                        filled-blue hover:bg-bluelagoon focus:bg-bluelagoon 
                                        mt-8 ml-auto rounded-sm w-14" onClick={() => 
                                            setState(prev => ({
                                                ...prev,
                                                isEditing: true
                                            }))
                                        } loading={isSaving}>
                                            <i className="icon icon-edit text-lg mr-2" />
                                            Edit
                                        </Button>
                                    </>
                                }
                            </div> :
                            <Spinner />
                        }
                    </>
                }
            </div>
            <style jsx={"true"}>{`
                .remarks-editor .ql-container,
                .remarks-editor .ql-editor {
                    min-height: 200px;
                }

                .remarks-editor .ql-editor {
                    font-size: 14px;
                }

                .remarks-editor .ql-editor.ql-blank::before {
                    font-style: normal;
                }
            `}</style>
        </Modal>
    )
}

export default ReportModal;