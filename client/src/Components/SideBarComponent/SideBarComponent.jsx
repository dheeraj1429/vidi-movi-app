import React, { useState } from "react";
import * as sideBar from "./SideBarComponent.style";
import SideBaOptionComponent from "../SideBaOptionComponent/SideBaOptionComponent";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { VscHeart } from "@react-icons/all-files/vsc/VscHeart";
import { VscSync } from "@react-icons/all-files/vsc/VscSync";

function SideBarComponent() {
    const [ActiveBar, setActiveBar] = useState("Home");

    const ActiveBarHandler = function (e) {
        const target = e.currentTarget;
        const targetData = target.getAttribute("data-target");
        setActiveBar(targetData);
    };

    return (
        <sideBar.mainDiv>
            <sideBar.innerDiv>
                <SideBaOptionComponent icon={<VscHome />} innerText={"Home"} event={ActiveBarHandler} activeBar={ActiveBar} />
                <SideBaOptionComponent icon={<VscHeart />} innerText={"Link"} event={ActiveBarHandler} activeBar={ActiveBar} />
                <SideBaOptionComponent icon={<VscSync />} innerText={"History"} event={ActiveBarHandler} activeBar={ActiveBar} />
            </sideBar.innerDiv>
        </sideBar.mainDiv>
    );
}

export default SideBarComponent;
