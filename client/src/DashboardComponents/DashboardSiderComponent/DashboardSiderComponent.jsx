import React, { useState, useEffect } from "react";
import * as sidebar from "./DashboardSiderComponent.style";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { AiOutlineVideoCamera } from "@react-icons/all-files/ai/AiOutlineVideoCamera";
import SideBarOptionComponent from "../../Components/SideBarOptionComponent/SideBarOptionComponent";
import { BiVideo } from "@react-icons/all-files/bi/BiVideo";
import { useLocation } from "react-router-dom";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import useNav from "../../Hooks/useNav";
import UserSettingProfileComponent from "../../Components/UserSettingProfileComponent/UserSettingProfileComponent";

function DashboardSiderComponent() {
    const [ActiveBar, setActiveBar] = useState("Dashboard");
    const loaction = useLocation();
    const nav = useNav();

    useEffect(() => {
        if (loaction.pathname === "/Dashboard") {
            return;
        } else {
            setActiveBar(nav);
        }
    }, [nav]);

    const ActiveBarHandler = function (e) {
        const target = e.currentTarget;
        const targetData = target.getAttribute("data-target");
        setActiveBar(targetData);
    };

    return (
        <sidebar.div>
            <sidebar.innerDiv>
                <UserSettingProfileComponent designDashboard={true} />
                <sidebar.side>
                    <SideBarOptionComponent
                        icon={<VscHome />}
                        innerText={"Dashboard"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                        dashboardBar={true}
                    />
                </sidebar.side>
                <sidebar.side>
                    <SideBarOptionComponent
                        icon={<AiOutlineVideoCamera />}
                        innerText={"Movies Upload"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                        dashboardBar={true}
                    />
                </sidebar.side>
                <sidebar.side>
                    <SideBarOptionComponent
                        icon={<BiVideo />}
                        innerText={"Movies"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                        dashboardBar={true}
                    />
                </sidebar.side>
                <sidebar.side>
                    <SideBarOptionComponent
                        icon={<FiUsers />}
                        innerText={"Users"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                        dashboardBar={true}
                    />
                </sidebar.side>
            </sidebar.innerDiv>
        </sidebar.div>
    );
}

export default DashboardSiderComponent;
