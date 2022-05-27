import React, { useState, useEffect } from "react";
import * as sidebar from "./DashboardSiderComponent.style";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { AiOutlineVideoCamera } from "@react-icons/all-files/ai/AiOutlineVideoCamera";
import SideBarOptionComponent from "../../Components/SideBarOptionComponent/SideBarOptionComponent";
import { BiVideo } from "@react-icons/all-files/bi/BiVideo";
import { useLocation } from "react-router-dom";

function DashboardSiderComponent() {
    const [ActiveBar, setActiveBar] = useState("Dashboard");
    const loaction = useLocation();

    useEffect(() => {
        const upFn = function (str, index) {
            return str[index].charAt(0).toUpperCase() + str[index].slice(1);
        };

        const path = loaction.pathname.split("/").slice(-1)[0];
        if (path.split("-").length >= 2) {
            console.log(path.split("-").length);
            const strSplit = path.split("-");
            const splitText = upFn(strSplit, 0) + " " + upFn(strSplit, 1);
            setActiveBar(splitText);
        } else {
            const str = path.charAt(0).toUpperCase() + path.slice(1);
            setActiveBar(str);
        }
    }, []);

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
                <SideBarOptionComponent icon={<BiVideo />} innerText={"Movies"} event={ActiveBarHandler} activeBar={ActiveBar} />
            </sidebar.innerDiv>
        </sidebar.div>
    );
}

export default DashboardSiderComponent;
