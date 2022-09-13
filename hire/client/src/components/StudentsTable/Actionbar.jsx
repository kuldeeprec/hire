import React, { useState } from "react";
import { Button, Select } from "antd";
import ExcelJS from "exceljs";
import FileSaver from 'file-saver';
import { getSubdomain, openNotification } from "../../utils/common";

const { Option } = Select;

const Actionbar = (props) => {
    const [isDownloading, setDownloading] = useState(false);
    const subdomain = getSubdomain();
    const { 
        activeRid, 
        batches, 
        roles,
        rounds, 
        organizations, 
        setActiveBid, 
        setActiveOid, 
        setActiveRid,
        selectedRows
    } = props;

    const renderBatches = () => {
        return batches.map((batch, key) => 
            <Option value={batch.batch_id} key={key} />
        );
    }

    const renderRoles = () => {
        return roles.map((role, key) => 
            <Option value={role.role_id} key={key}>
                { role.role_name }
            </Option>
        );
    }

    const renderOrganizations = () => {
        return organizations.map((organization, key) => 
            <Option value={organization.id} key={key}>
                { organization.name }
            </Option>
        );
    }

    const downloadReports = () => {
        if(selectedRows.length) {
            setDownloading(true);
    
            const renderRounds = () => {
                return [...Array(rounds)].reduce((accumulator, _, key) => {
                    return [
                        ...accumulator,
                        {
                            header: "ROUND " + (key + 1) + " SCORE",
                            key: "round_" + (key + 1) + "_score",
                            width: 15
                        },
                        {
                            header: "ROUND " + (key + 1) + " STATUS",
                            key: "round_" + (key + 1) + "_status",
                            width: 15
                        }
                    ];
                }, []);
            }
    
            setTimeout(async() => {    
                const workbook = new ExcelJS.Workbook();
        
                const worksheet = workbook.addWorksheet('Report');
                worksheet.columns = [
                    {
                        header: "NAME",
                        key: "name"
                    },
                    {
                        header: "YOP",
                        key: "yop"
                    },
                    {
                        header:"EMAIL",
                        key:"email"
                    },
                    {
                        header: "GENDER",
                        key: "gender"
                    },
                    {
                        header: "COLLEGE",
                        key: "college"
                    },
                    {
                        header: "COLLEGE STATE",
                        key: "clgState"
                    },
                    {
                        header: "PERCENTAGE",
                        key: "percentage"
                    },
                    {
                        header: "STATE",
                        key: "state"
                    },
                    {
                        header: "DEGREE",
                        key: "degree"
                    },
                    {
                        header: "DEPARTMENT",
                        key: "department"
                    },
                    {
                        header: "RESUME",
                        key: "resume"
                    },
                    {
                        header: "LINKEDIN",
                        key: "linkedin"
                    },
                    {
                        header: "MOBILE NUMBER",
                        key: "mobileNumber"
                    },
                    {
                        header: "PREFERRED LANGUAGE",
                        key: "preferred_language"
                    },
                    ...renderRounds()
                ];

                worksheet.addRows(selectedRows);
                
                await workbook.xlsx.writeBuffer().then(data => {
                    const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" }); 
                    FileSaver.saveAs(blob, "report");
                });
    
                setDownloading(false);
            }, 1000);
        } else {
            openNotification("error", "Please select rows to download", 2);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between action-bar">
                <div className="flex items-center">
                    <h1 className="font-bold text-2xl text-bluelagoon">
                        Candidates Reports
                    </h1>
                </div>
                <div className="flex gap-6 items-center">
                    {
                        subdomain === "super" &&
                        <Select className="h-12 w-48" defaultValue={""}
                        onChange={(value) => setActiveOid(value)}>
                            <Option value={""}>Select Company</Option>
                            { renderOrganizations() }
                        </Select>
                    }
                    <Select className="h-12 w-48" defaultValue={activeRid}
                    onChange={(value) => setActiveRid(value)}>
                        <Option value={""}>Select Role</Option>
                        { renderRoles() }
                    </Select>
                    {
                        subdomain === "super" &&
                        <Select className="h-12 w-48" defaultValue={""}
                        onChange={(value) => setActiveBid(value)}>
                            <Option value={""}>Select Batch</Option>
                            { renderBatches() }
                        </Select>
                    }
                    <Button className="flex items-center h-12 bg-sandstone text-dove 
                    focus:bg-sandstone focus:text-dove focus:border-sandstone
                    hover:bg-sandstone hover:text-dove hover:border-sandstone
                    rounded-sm" loading={isDownloading} onClick={() => downloadReports()}>
                        <i className="icon icon-download text-xl" />
                    </Button>
                </div>
            </div>
            <style jsx={"true"}>{`
                .action-bar .ant-select:not(.ant-select-customize-input) 
                .ant-select-selector {
                    background-color: var(--bluelagoon);
                    border-color: var(--bluelagoon);
                    color: var(--dove);
                }

                .action-bar .ant-select-arrow {
                    color: var(--dove);
                }
            `}</style>
        </>
    )
}

export default Actionbar;