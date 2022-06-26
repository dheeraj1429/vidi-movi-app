import React, { useState, useEffect } from "react";
import * as sideBar from "./SideBarComponent.style";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { VscHeart } from "@react-icons/all-files/vsc/VscHeart";
import { VscSync } from "@react-icons/all-files/vsc/VscSync";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";
import useNav from "../../Hooks/useNav";
import { useLocation } from "react-router";
import { useCookies } from "react-cookie";

function SideBarComponent() {
    const [cookies] = useCookies(["user"]);
    const [ActiveBar, setActiveBar] = useState("Home");
    const nav = useNav();
    const location = useLocation();

    const ActiveBarHandler = function (e) {
        const target = e.currentTarget;
        const targetData = target.getAttribute("data-target");
        setActiveBar(targetData);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            return;
        } else {
            setActiveBar(nav);
        }
    }, [nav]);

    return (
        <sideBar.mainDiv>
            <sideBar.innerDiv>
                <SideBarOptionComponent icon={<VscHome />} innerText={"Home"} event={ActiveBarHandler} activeBar={ActiveBar} />
                {cookies && cookies?.user ? (
                    <>
                        <SideBarOptionComponent icon={<VscHeart />} innerText={"Like"} event={ActiveBarHandler} activeBar={ActiveBar} />
                        <SideBarOptionComponent icon={<VscSync />} innerText={"History"} event={ActiveBarHandler} activeBar={ActiveBar} />
                    </>
                ) : null}
            </sideBar.innerDiv>
        </sideBar.mainDiv>
    );
}

export default SideBarComponent;
