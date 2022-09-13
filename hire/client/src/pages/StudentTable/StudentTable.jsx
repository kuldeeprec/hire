import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import axios from "axios";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Layout from "../../components/Layout/Layout";
import Spinner from "../../components/Spinner/Spinner";
import Actionbar from "../../components/StudentsTable/Actionbar";
import ResumeModal from "../../components/StudentsTable/ResumeModal";
import ProfileModal from "../../components/StudentsTable/ProfileModal";
import ReportModal from "../../components/StudentsTable/ReportModal";
import { __getToken } from "../../utils/user-details";
import { getSearchParam, getSubdomain, handleError, openNotification } from "../../utils/common";
import { ENTITY_ID, G_API_URL, G_PORTAL_DOMAIN, G_TEST_DOMAIN } from "../../constants/constants";

const StudentTable = () => {
    const defaultState = {
        activeOid: "",
        activeRid: "",
        activeBid: "",
        activeUserId: undefined,
        activeReport: undefined,
        activeResume: "",
        batches: [],
        organizations: [],
        isLoading: false,
        iaMounted: false,
        isRetrieving: false,
        reports: [],
        rounds: [],
        roles: [],
        searchedColumn: undefined,
        searchText: "",
        selectedRows: []
    }
    const [state, setState] = useState(defaultState);

    let searchInput = useRef();

    const subdomain = getSubdomain();

    const { 
        activeOid, 
        activeRid, 
        activeBid, 
        activeUserId, 
        activeReport, 
        activeResume,
        batches,
        isLoading, 
        isMounted,
        isRetrieving,
        organizations,
        roles,
        reports, 
        rounds,
        searchedColumn,
        searchText,
        selectedRows
    } = state;

    const email = getSearchParam('email');

    const getReports = useCallback((role_id) => {
        setState(prev => ({
            ...prev,
            isRetrieving: true
        }));

        const getDomain = () => {
            const organization = organizations.find(organization => 
                organization.id === activeOid
            )
            return organization ? organization.domain : "";
        }

        axios.get(G_API_URL + "reports/", {
            params: {
                ...(activeOid && {
                    o_id: activeOid,
                    domain: getDomain()
                }),
                ...(activeBid && {
                    batch_id: activeBid
                }),
                ...(email && {
                    candidate_email: email
                }),
                role_id: role_id ? role_id : activeRid
            },
            headers: {
                Authorization: __getToken()
            }
        }).then((response) => {
            response = response.data;
            if(response.status === 1) {
                setState(prev => ({
                    ...prev,
                    isRetrieving: false,
                    reports: response.reports,
                    rounds: response.rounds
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    isRetrieving: false
                }));
            }
        }).catch((error) => {
            error = error.response;
            handleError(error);
        });
    }, [activeBid, activeOid, activeRid, email, organizations])

    useEffect(() => {
        if(!isMounted) {
            setState(prev => ({
                ...prev,
                isLoading: true
            }));
            axios.get(G_API_URL + 'reports/options' ,{
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                if(response.status === 1) {
                    setState(prev => ({
                        ...prev,
                        roles: response.roles,
                        batches: response.batches,
                        organizations: response.organizations,
                        ...(subdomain !== "super" && {
                            activeRid: response.role_id
                        }),
                        isLoading: false,
                        isMounted: true
                    }));
                } else {
                    setState(prev => ({
                        ...prev,
                        isLoading: false
                    }));
                }
            }).catch(error => {
                error = error.response;
                handleError(error);
            });
        } else {
            getReports();
        }
    }, [getReports, isMounted, subdomain]);

    const setActiveOid = (activeOid) => {
        setState(prev => ({
            ...prev,
            activeOid
        }));
    }

    const setActiveRid = (activeRid) => {
        setState(prev => ({
            ...prev,
            activeRid
        }));
    }

    const setActiveBid = (activeBid) => {
        setState(prev => ({
            ...prev,
            activeBid
        }));
    }

    const copyResumeLink = (link) => {
        navigator.clipboard.writeText(link);
        openNotification("success", "Link copied to clipboard", 2);
    }

    const copyUserLink = (email) => {
        navigator.clipboard.writeText('https://' + subdomain + G_PORTAL_DOMAIN + '/candidates-reports?email=' + email);
        openNotification("success", "Link copied to clipboard", 2);
    }

    const setActiveResume = (activeResume = undefined) => {
        setState(prev => ({
            ...prev,
            activeResume
        }));
    }

    const setActiveUserId = (activeUserId = undefined) => {
        setState(prev => ({
            ...prev,
            activeUserId
        }));
    }

    const setActiveReport = (activeReport = undefined) => {
        setState(prev => ({
            ...prev,
            activeReport
        }));
    }

    const viewReport = (report) => {
        if(report.type === 1) {
            axios.get(G_API_URL + 'reports/detailed-report', {
                params: {
                    attempt: report.attempt,
                    test_id: report.test_id,
                    instance_id: report.instance_id,
                    user_id: report.user_id,
                    o_id: report.o_id
                },
                headers: {
                    Authorization: __getToken()
                }
            }).then(response => {
                response = response.data;
                setTimeout(() => {
                    if (response.status === 1) {
                        // redirectToTest(resp.data.payloadEnc, resp.data.authToken);
                        document.getElementById('payload').value = response.payloadEnc;
                        document.getElementById('auth_token').value = response.authToken;
                        document.getElementById('report_redirect').submit();
                    } else {
                        // setLoading(false);
                        openNotification('error', response.message, 2)
                    }
                }, 1000);
            }).catch(error => {
                error = error.response;
                handleError(error);
            });
        } else {
            setActiveReport(report);
        }
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState(prev => ({
            ...prev,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        }));
    };

    const handleReset = clearFilters => {
        clearFilters();
        setState(prev => ({ ...prev, searchText: "" }));
    };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                className="flex items-center"
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => searchInput.select(), 100);
          }
        },
        render: text =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
      
    const columns = [
        {
          title: "Name",
          key: "name",
          fixed: "left",
          width: 250,
          ...getColumnSearchProps("name"),
          render: (report) => (
            <span className="cursor-pointer hover:text-bluelagoon"
            onClick={() => setActiveUserId(report.uid)}>
                { report.name }
            </span>
          )
        },
        {
          title: "Yop",
          dataIndex: "yop",
          key: "yop",
          width: 100,
          ...getColumnSearchProps("yop")
        },
        {
          title: "Gender",
          dataIndex: "gender",
          filters: [
            { text: "Male", value: "Male" },
            { text: "Female", value: "Female" }
          ],
          key: "gender",
          width: 150,
          onFilter: (value, record) => (
            value === record["gender"]
          )
        },
        {
            title: "Degree",
            dataIndex: "degree",
            key: "degree",
            width: 150,
            ...getColumnSearchProps("degree"),
        },
        {
            title: "Department",
            dataIndex: "department",
            key: "department",
            width: 250,
            ...getColumnSearchProps("department"),
        },
        {
            title: "Resume",
            dataIndex: "resume",
            key: "resume",
            render: (resume) => (
                <div className="flex gap-4">
                    <i className="icon icon-file-text font-bold text-xl hover:text-bluelagoon 
                    cursor-pointer" onClick={() => setActiveResume(resume)} />
                    <i className="icon icon-copy font-bold text-xl hover:text-bluelagoon 
                    cursor-pointer" onClick={() => copyResumeLink(resume)} />
                </div>
            )
        },
        {
            title: "Preferred Language",
            dataIndex: "preferred_language",
            key: "preferred_language"
        },
        ...[...Array(rounds)].map((_, key) => ({
            title: "Round " + (key + 1),
            dataIndex: "round_" + (key + 1),
            key: "round_" + (key + 1),
            children: [
                {
                    title: "Score",
                    dataIndex: "round_" + (key + 1) + "_score",
                    key: "round_" + (key + 1) + "_score",
                    sorter: (a, b) => (
                        a["round_" + (key + 1) + "_score"] - b["round_" + (key + 1) + "_score"]
                    )
                },
                {
                    title: "Reports",
                    dataIndex: "round_" + (key + 1) + "_report",
                    key: "round_" + (key + 1) + "_report",
                    render: (report) => (
                        report &&
                        <i className={`icon icon-${report.type === 1 ? "external-link" : "file"} 
                        cursor-pointer font-bold hover:text-bluelagoon text-xl`} 
                        onClick={() => viewReport(report)} />
                    )
                },
                {
                    title: "Status",
                    dataIndex: "round_" + (key + 1) + "_status",
                    filters: [
                        { text: "Selected", value: "Selected" },
                        { text: "Not Selected", value: "Not Selected" }
                    ],
                    key: "round_" + (key + 1) + "_status",
                    onFilter: (value, record) => (
                        value === record["round_" + (key + 1) + "_status"]
                    )
                }
            ]
        })),
        {
            title: "Link",
            key: "link",
            fixed: "right",
            width: 100,
            render: (record) => (
                <i className="icon icon-copy cursor-pointer font-bold 
                hover:text-bluelagoon text-xl" onClick={() => 
                copyUserLink(record.email)} />
            )
        }
    ];

    const rowSelection = {
        onChange: (_, selectedRows) => {
          setState(prev => ({
            ...prev,
            selectedRows
          }));
        },
        getCheckboxProps: (record) => ({
          // Column configuration not to be checked
          name: record.name,
        }),
    };

    return (
        <Layout>
            {
                !isLoading ?
                <div className="px-12 py-8">
                    <Actionbar
                        activeRid={activeRid}
                        batches={batches}
                        selectedRows={selectedRows}
                        roles={roles}
                        rounds={rounds}
                        organizations={organizations}
                        setActiveBid={setActiveBid}
                        setActiveOid={setActiveOid}
                        setActiveRid={setActiveRid}
                    />
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        bordered={false}
                        className="mt-8" 
                        columns={columns}
                        dataSource={reports}  
                        loading={isRetrieving}
                        pagination={true}
                        scroll={{ x: 3000, y: 450 }}
                    />
                    {
                        activeResume &&
                        <ResumeModal 
                            activeResume={activeResume}
                            setActiveResume={setActiveResume}
                        />
                    }
                    { 
                        activeUserId && 
                        <ProfileModal 
                            activeUserId={activeUserId}
                            setActiveUserId={setActiveUserId} 
                        /> 
                    }
                    {
                        activeReport && 
                        <ReportModal
                            activeReport={activeReport}
                            getReports={getReports}
                            setActiveReport={setActiveReport}
                        />
                    }
                </div> :
                <Spinner />
            }
            <form
                key={'redirect'}
                method="POST"
                target="_blank"
                action={G_TEST_DOMAIN + 'auth/'}
                name="report_redirect"
                id="report_redirect"
            >
                <input
                    className="hidden"
                    type="hidden"
                    name="entity_id"
                    placeholder="entity_id"
                    value={ENTITY_ID}
                    id="entity_id"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="fallback_url"
                    placeholder="fallback_url"
                    value={'http://' + subdomain + G_PORTAL_DOMAIN + '/'}
                    id="fallback_url"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="payload"
                    placeholder="payload"
                    value=""
                    id="payload"
                />
                <input
                    className="hidden"
                    type="hidden"
                    name="auth_token"
                    placeholder="auth_token"
                    value=""
                    id="auth_token"
                />
            </form>

            <style jsx={"true"}>{`
                body {
                    overflow-y: hidden;
                }

                .ant-checkbox {
                    border: 2px solid var(--carbon);
                    border-radius: 3px;
                }

                .ant-checkbox-checked {
                    border-color: var(--bluelagoon);
                }

                .ant-checkbox-inner,
                .ant-checkbox-checked::after {
                    border: none;
                    border-radius: unset;
                }

                .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: var(--bluelagoon);
                }

                .ant-checkbox-inner {
                    height: 14px;
                    width: 14px;
                }

                .ant-table-selection-col {
                    width: 64px;
                }
            `}</style>
        </Layout>
    )
}

export default StudentTable;