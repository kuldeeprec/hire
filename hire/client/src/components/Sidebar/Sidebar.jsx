import React from "react";
import { NavLink } from "react-router-dom";
import { getSubdomain } from "../../utils/common";

const Sidebar = () => {
    const subdomain = getSubdomain();
    const menu = [
        {
            label: "Insights",
            icon: <i className="icon icon-trending-up text-xl" />,
            slug: "/insights"
        },
        {
            label: "Details"
        },
        {
            label: "Candidates Reports",
            icon: <i className="icon icon-clipboard text-xl" />,
            slug: "/candidates-reports"
        },
        {
            label: "Management"
        },
        {
            label: "User Management",
            icon: <i className="icon icon-users text-xl" />,
            slug: "/user-management"
        },
        {
            label: "Interview Management",
            icon: <i className="icon icon-grid text-xl" />,
            slug: "/interview-management"
        },
        {
            label: "Training Management",
            icon: <i className="icon icon-briefcase text-xl" />,
            slug: "/training-management"
        },
        ...(subdomain === "super" ? [
            {
                label: "Super Admin"
            },
            {
                label: "Domain Management",
                icon: <i className="icon icon-file-text text-xl" />,
                slug: "/domain-management"
            }
        ] : [])
    ];

    const renderMenu = () => {
        return menu.map((menuItem, key) =>
            menuItem.slug ?
                <NavLink
                    to={menuItem.slug}
                    key={key}
                    activeClassName={"active bg-bluelagoon border-persianblue text-dove hover:text-dove"}
                    className={"flex items-center py-2.5 px-8 text-carbon hover:text-carbon menu-item border-l-4 border-transparent hover:border-persianblue"}
                >
                    {menuItem.icon}
                    <span className="ml-4 text-xs">
                        {menuItem.label}
                    </span>
                </NavLink> :
                <div key={key} className="py-4 px-8 text-xs text-opacity-38 text-silver uppercase font-black border-l-4 border-transparent">
                    {menuItem.label}
                </div>
        )
    }

    return (
        <>
            <div className="sidebar bg-lightblue overflow-y-scroll">
                {renderMenu()}
            </div>
            <style jsx>{`
                .sidebar {
                    border-left:0;
                    height: calc(100vh - 64px);
                    left: 0px;
                    position: fixed;
                    top: 64px;
                    width: 250px;
                    z-index: 1000;
                }

                .sidebar .menu-item.active > svg > path {
                    stroke: var(--dove);
                }

                .sidebar .menu-item:not(.active):hover {
                    background-color: var(--porcelain);
                }

                /* Hide scrollbar for Chrome, Safari and Opera */
                .sidebar::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .sidebar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    )
}

export default Sidebar;