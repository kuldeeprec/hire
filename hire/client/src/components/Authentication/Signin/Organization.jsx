import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { G_APP_PLATFORM, G_API_URL, G_PORTAL_DOMAIN }from 
"../../../constants/constants";
import { __getToken } from "../../../utils/user-details";
import { handleError, openNotification } from "../../../utils/common";

const Organization = () => {

    const [isLoading, setLoading] = useState(false);
    const [subdomain, setSubdomain] = useState("");

    useEffect(() => {
        const element = document.getElementById("subdomain-input");
        element.addEventListener("paste", (event) => {
            event.preventDefault();
        });
    }, []);

    const handleKeyDown = (event) => {
        if(event.keyCode === 13) {
            event.preventDefault();
        } 
    }

    const handleKeyUp = (event) => {
        if(event.keyCode !== 13) {
            setSubdomain(event.target.textContent);
        } else {
            handleClick();
        }
    }

    const handleClick = () => {
        if(subdomain) {
            setLoading(true);
            axios.get(G_API_URL + "ogn/check/domain", {
                headers: {
                    Authorization: __getToken()
                },
                params: {
                    domain: subdomain
                }
            }).then((response) => {
                response = response.data;
                setTimeout(() => {
                    setLoading(false);
                    if(response.status === 1) {
                        if (G_APP_PLATFORM === "local") {
                            window.location.href = "http://" + subdomain + 
                            G_PORTAL_DOMAIN + "/";
                        } else {
                            window.location.href = "https://" + subdomain + 
                            G_PORTAL_DOMAIN + "/";
                        }
                    } else {
                        openNotification("error", response.message, 2);
                    }
                }, 1000);
            }).catch((error) => {
                error = error.response;
                handleError(error);
            });
        } else {
            openNotification("error", "Domain name cannot be empty!", 2);
        }
    }

    return (
        <>
            <div className="mt-8 lg:mt-14">
                <h2 className="font-extrabold font-montserrat 
                text-mob-subtitle lg:text-subtitle">
                    Enter your organization URL
                </h2>
                <div className="bg-dove border border-silver flex 
                items-center overflow-hidden text-base mt-7 px-3.5 
                w-full whitespace-nowrap lg:w-95">
                    <div className="cursor-text outline-none py-3.5" 
                    contentEditable={true} data-placeholder="organization" 
                    id="subdomain-input" onKeyDown={(e) => handleKeyDown(e)} 
                    onKeyUp={(e) => handleKeyUp(e)} />
                    <span className="cursor-default">
                        { G_PORTAL_DOMAIN }
                    </span>
                </div>
                <Button className="default-blue-btn filled-blue 
                btn-large mt-4" loading={isLoading} 
                onClick={() => handleClick()}>
                    Continue
                </Button>
            </div>
            <style jsx={"true"}>{`
                [data-placeholder]:empty:before{
                    content: attr(data-placeholder);
                    color: var(--carbon);
                    opacity: 38%;
                }
            `}</style>
        </>
    )
}

export default Organization;