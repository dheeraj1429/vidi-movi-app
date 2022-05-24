import React, { useState } from "react";
import * as sidebar from "./DashboardSiderComponent.style";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { AiOutlineVideoCamera } from "@react-icons/all-files/ai/AiOutlineVideoCamera";
import SideBarOptionComponent from "../../Components/SideBarOptionComponent/SideBarOptionComponent";

function DashboardSiderComponent() {
    const [ActiveBar, setActiveBar] = useState("Dashboard");

    const ActiveBarHandler = function (e) {
        const target = e.currentTarget;
        const targetData = target.getAttribute("data-target");
        setActiveBar(targetData);
    };

    return (
        <sidebar.div>
            <sidebar.innerDiv>
                <SideBarOptionComponent icon={<VscHome />} innerText={"Dashboard"} event={ActiveBarHandler} activeBar={ActiveBar} />
                <SideBarOptionComponent icon={<AiOutlineVideoCamera />} innerText={"Movies Upload"} event={ActiveBarHandler} activeBar={ActiveBar} />
            </sidebar.innerDiv>
        </sidebar.div>
    );
}

export default DashboardSiderComponent;
