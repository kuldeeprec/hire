import React from "react";
import { Tabs } from "antd";
import UserDetails from "../../components/Settings/UserDetails";
import ChangePassword from "../../components/Settings/ChangePassword";
import Layout from "../../components/Layout/Layout";

const { TabPane } = Tabs;

const Settings = () => {
    return (
        <Layout>
            <div className="px-12 py-8 settings-wrapper w-full">
                <div className="font-bold text-2xl text-bluelagoon">
                    <span>Settings</span>
                </div>
                <Tabs className="mt-2" defaultActiveKey="user-details">
                    <TabPane tab="User details" key="user-details">
                        <UserDetails />
                    </TabPane>
                    <TabPane tab="Password" key="password">
                        <ChangePassword />
                    </TabPane>
                </Tabs>
            </div>
            <style jsx={"true"}>{`
                .settings-wrapper .ant-tabs-nav::before {
                    border-bottom: 1px solid #CCCCCC;
                }

                .settings-wrapper .ant-tabs-nav-list .ant-tabs-tab {
                    padding: 16px 0;
                    flex: 1;
                    justify-content: center;
                    width: 150px;
                }

                .settings-wrapper .ant-tabs-nav-list .ant-tabs-tab .ant-tabs-tab-btn {
                    color: var(--carbon);
                    font-size: 1rem;
                    font-weight: 400;
                }

                .settings-wrapper .ant-tabs-nav-list .ant-tabs-ink-bar {
                    background: var(--bluelagoon);
                    height: 4px;
                }
            `}</style>
        </Layout>
    )
}

export default Settings;