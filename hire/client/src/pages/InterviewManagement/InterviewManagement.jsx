import React from "react";
import Layout from "../../components/Layout/Layout";
import { ReactComponent as InterviewManagementVector } from 
"../../assets/imgs/interview-management/interview-management-vector.svg";

const InterviewManagement = () => {
    return (
        <Layout>
            <div className="flex flex-col h-full w-full items-center justify-center pt-20">
                <InterviewManagementVector />
                <div className="text-faded-66 text-lg text-bluelagoon mt-8">
                    <b>Interview Management</b> coming soon!
                </div>
            </div>
        </Layout>
    )
}

export default InterviewManagement;