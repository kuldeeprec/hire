import React, { useEffect, useState } from "react";
import { Divider, Empty, Modal, Progress } from "antd";
import axios from "axios";
import moment from "moment";
import Spinner from "../../components/Spinner/Spinner";
import { __getToken } from "../../utils/user-details";
import { handleError, openNotification } from "../../utils/common";
import { G_API_URL } from "../../constants/constants";

const ProfileModal = (props) => {
    const { activeUserId, setActiveUserId } = props;
    
    const [isLoading, setLoading] = useState(false);
    const [profile, setProfile] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get(G_API_URL + "reports/profile", {
            params: {
                user_id: activeUserId
            }, 
            headers: {
                Authorization: __getToken()
            }
        }).then(response => {
            response = response.data;
            setTimeout(() => {
                setLoading(false);
                if(response.status === 1) {
                    setProfile(response.profile);
                } else {
                    openNotification("error", response.message, 2);
                }
            }, 800);
        }).catch(error => {
            error = error.response;
            handleError(error);
        });
    }, [activeUserId]);

    const renderGraduationInfo = (type = "ug") => {
        return (
            <div>
                <h3 className="font-semibold text-lg text-bluelagoon">
                    { 
                        type === "ug" ? (profile.degree.includes("M") ?
                         "UG Details" : "Graduation Details") :
                        "PG Details" 
                    }
                </h3>
                <p className="flex items-center mt-2">
                    <i className="icon icon-institution-big text-bold text-xl" />
                    <span className="text-small ml-2">
                        { profile[type === "pg" ? "pgCollege" : "college"] }
                    </span>
                </p>
                <div className="grid grid-cols-3 mt-2">
                    <p className="break-all flex items-center">
                        <i className="icon icon-file-text text-bold text-xl" />
                        <span className="ml-2">
                            { profile.degree }
                        </span>
                    </p>
                    <p className="break-all flex items-center mx-auto">
                        <i className="icon icon-file text-bold text-xl" />
                        <span className="ml-2">
                            { profile[type === "pg" ? "pgStream" : "stream"] }
                        </span>
                    </p>
                    <p className="break-all flex items-center mx-auto">
                        <i className="icon icon-map-pin text-bold text-xl" />
                        <span className="ml-2">
                            { profile[type === "pg" ? "pgClgState" : "clgState"] }
                        </span>
                    </p>
                </div>
            </div>
        )
    }

    const renderWorkExperience = () => {
        return profile.companies.map((company, key) => {
            const endDateObj = company.currentCompany ? moment() : moment(company.endDate * 1000);
            let duration = endDateObj.diff(moment(company.startDate * 1000), "months", true);
            duration = Math.ceil(duration);
            duration = duration < 12 ? duration + " mos" : Math.floor(duration / 12) 
            + " yr " + (Math.floor(duration % 12) ? Math.floor(duration % 12) + " mos" : "");
            return (
                <>
                    { key > 0 && <Divider /> }
                    <h3 className="font-semibold text-lg text-bluelagoon">
                        { company.company }
                    </h3>
                    <p className="opacity-50">
                        {company.designation} &middot; { company.employmentType }
                    </p>
                    <p className="opacity-50">
                        { 
                            moment(company.startDate * 1000).format("MMM YYYY") + " - " + 
                            (company.currentCompany ? "Present" : moment(company.endDate * 1000).format("MMM YYYY")) 
                        }
                        &nbsp;&middot;&nbsp;
                        { duration }
                    </p>
                    <p className="opacity-50">{ company.location }</p>
                </>
            )
        });
    }

    const renderSkills = (skills) => {
        return skills.map(skill => 
            <span className="bg-dove px-6 py-2 rounded-full">
                {skill}
            </span>
        )
    }

    const renderProjects = () => {
        return profile.projects.map((project, key) => {
            return (
                <>
                    { key > 0 && <Divider /> }
                    <h3 className="font-semibold text-lg text-bluelagoon">
                        { project.projectName }
                    </h3>
                    <p className="opacity-50">
                        { 
                            project.projectField + (" ( " + moment(project.startDate * 1000).format("MMM YYYY") + " - " + 
                            (project.currentProject ? "Present" : moment(project.endDate * 1000).format("MMM YYYY")) + " )")
                        }
                    </p>
                    <p className="mt-2">{ project.description }</p>
                </>
            )
        });
    }

    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            footer={null}
            onCancel={() => setActiveUserId()}
            title=""
            visible={true}
            width={880}
        >
            <div className="p-2">
                <div className="flex justify-end">
                    <i className="bg-silver cursor-pointer font-semibold 
                    icon icon-x px-1.5 py-0.5 rounded-full text-lg" 
                    onClick={() => setActiveUserId()} />
                </div>
                {
                    !isLoading && profile ?
                    <div>
                        <div className="flex flex-col items-center">
                            <img src={profile.profilePic} alt="profile-pic"
                            className="rounded-full h-32 w-32" />
                            <p className="font-semibold text-bluelagoon text-lg
                            mt-2">
                                { profile.firstName + " " + profile.lastName }
                            </p>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-bold text-lg uppercase">
                                Personal Information
                            </h3>
                            <div className="bg-lightblue border border-bluelagoon 
                            mt-3 p-8 rounded">
                                <h3 className="font-semibold text-lg text-bluelagoon">
                                    About
                                </h3>
                                <p className="text-sm mt-2">{ profile.about ?? "-" }</p>
                                <Divider className="bg-dove h-0.5" />
                                <p className="flex items-center">
                                    <i className="icon icon-map-pin font-bold text-xl" />
                                    <span className="ml-2">{ profile.address }</span>
                                </p>
                                <div className="grid grid-cols-3 mt-2">
                                    <p className="break-all flex items-center">
                                        <i className="icon icon-mail font-bold text-xl" />
                                        <span className="ml-2">{ profile.email }</span>
                                    </p>
                                    <p className="break-all flex items-center mx-auto">
                                        <i className="icon icon-mail font-bold text-xl" />
                                        <span className="ml-2">{ profile.clgEmail }</span>
                                    </p>
                                    <p className="break-all flex items-center mx-auto">
                                        <i className="icon icon-phone font-bold text-xl" />
                                        <span className="ml-2">{ profile.mobileNumber }</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <h3 className="font-bold text-lg uppercase">
                                Educational Information
                            </h3>
                            <div className="bg-lightblue border border-bluelagoon 
                            mt-3 p-8 rounded">
                                <h3 className="font-semibold text-lg text-bluelagoon">
                                    Academic Score
                                </h3>
                                <div className="grid grid-cols-2 gap-y-4 mt-4">
                                    <div className="text-small info w-4/6">
                                        <span>10th Percentage</span>
                                        <Progress percent={profile.sslcPercentage} size="small" />
                                    </div>
                                    <div className="text-small info w-4/6">
                                        <span>12th Percentage</span>
                                        <Progress percent={profile.hscPercentage} size="small" />
                                    </div>
                                    <div className="text-small info w-4/6">
                                        <span>
                                            { profile.degree.includes("M") ? "UG Percentage" : "Graduation Percentage" }
                                        </span>
                                        <Progress percent={profile.percentage} size="small" />
                                    </div>
                                    {
                                        profile.degree.includes("M") &&
                                        <div className="text-small info w-4/6">
                                            <span>PG Percentage</span>
                                            <Progress percent={profile.pgPercentage} size="small" />
                                        </div>
                                    }
                                </div>
                                <Divider className="bg-dove h-0.5" />
                                { 
                                    profile.degree.includes("M") ? renderGraduationInfo("pg") : 
                                    renderGraduationInfo() 
                                }
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-bold text-lg uppercase">
                                Professions Information/Experience
                            </h3>
                            <div className="bg-lightblue border border-bluelagoon 
                            mt-3 p-8 rounded">
                                { 
                                    profile.companies.length ?
                                    renderWorkExperience() :
                                    <Empty
                                        className="flex flex-col items-center"
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{
                                        height: 120,
                                        }}
                                        description={"No Data"}
                                    />
                                }
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-bold text-lg uppercase">
                                Skills
                            </h3>
                            <div className="bg-lightblue border border-bluelagoon 
                            mt-3 p-8 rounded">
                                <h3 className="font-semibold text-lg text-bluelagoon">
                                    Interpersonal Skills
                                </h3>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    { 
                                        profile.interpersonalSkills.length ?
                                        renderSkills(profile.interpersonalSkills) :
                                        <Empty
                                            className="flex flex-col items-center mx-auto"
                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                            imageStyle={{
                                            height: 120,
                                            }}
                                            description={"No Data"}
                                        />
                                    }
                                </div>
                                <Divider />
                                <h3 className="font-semibold text-lg text-bluelagoon">
                                    Tools & Technologies / Coding languages 
                                </h3>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    { 
                                        profile.technologiesKnown.length ?
                                        renderSkills(profile.technologiesKnown) :
                                        <Empty
                                            className="flex flex-col items-center mx-auto"
                                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                            imageStyle={{
                                            height: 120,
                                            }}
                                            description={"No Data"}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-bold text-lg uppercase">
                                Project Experience
                            </h3>
                            <div className="bg-lightblue border border-bluelagoon 
                            mt-3 p-8 rounded">
                                { 
                                    profile.projects.length ?
                                    renderProjects() :
                                    <Empty
                                        className="flex flex-col items-center"
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{
                                        height: 120,
                                        }}
                                        description={"No Data"}
                                    />
                                }
                            </div>
                        </div>
                    </div> :
                    <Spinner />
                }
            </div>
        </Modal>
    )
}

export default ProfileModal;