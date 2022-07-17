import React from "react";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";

function ProfileInnerOptionComponent({ icon, innerText, width }) {
    return <SideBarOptionComponent icon={icon} innerText={innerText} width={width} />;
}

export default ProfileInnerOptionComponent;
