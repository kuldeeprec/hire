import React from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = (props) => {
    return (
        <>
            <Header />
            <Sidebar />
            {props.children}
            <style>{`
                #root {
                    margin-left: 250px;
                }
            `}</style>
        </>
    )
}

export default Layout;