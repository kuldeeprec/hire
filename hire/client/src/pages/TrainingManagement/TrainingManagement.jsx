import React from "react";
import Layout from "../../components/Layout/Layout";
import { ReactComponent as TrainingManagementVector } from 
"../../assets/imgs/training-management/training-management-vector.svg";

const TrainingManagement = () => {
    return (
        <Layout>
            <div className="flex flex-col h-full w-full items-center justify-center pt-20">
                <TrainingManagementVector />
                <div className="text-faded-66 text-lg text-bluelagoon mt-8">
                    <b>Training Management</b> coming soon!
                </div>
            </div>
        </Layout>
    )
}

export default TrainingManagement;