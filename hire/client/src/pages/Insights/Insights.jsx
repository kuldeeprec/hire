import React from "react";
import Layout from "../../components/Layout/Layout";
import { ReactComponent as InsightsVector } from "../../assets/imgs/insights/insights-vector.svg";

const Insights = () => {
    return (
        <Layout>
            <div className="flex flex-col h-full w-full items-center justify-center pt-20">
                <InsightsVector />
                <div className="text-faded-66 text-lg text-bluelagoon mt-8"><b>Insights</b> coming soon!</div>
            </div>
        </Layout>
    )
}

export default Insights;