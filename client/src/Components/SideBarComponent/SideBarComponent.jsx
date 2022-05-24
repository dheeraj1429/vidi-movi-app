import React, { useState } from "react";
import * as sideBar from "./SideBarComponent.style";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { VscHeart } from "@react-icons/all-files/vsc/VscHeart";
import { VscSync } from "@react-icons/all-files/vsc/VscSync";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";

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
                <SideBarOptionComponent icon={<VscHome />} innerText={"Home"} event={ActiveBarHandler} activeBar={ActiveBar} />
                <SideBarOptionComponent icon={<VscHeart />} innerText={"Like"} event={ActiveBarHandler} activeBar={ActiveBar} />
                <SideBarOptionComponent icon={<VscSync />} innerText={"History"} event={ActiveBarHandler} activeBar={ActiveBar} />
            </sideBar.innerDiv>
        </sideBar.mainDiv>
    );
}

export default SideBarComponent;
