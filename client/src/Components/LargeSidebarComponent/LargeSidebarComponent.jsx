import React, { useState } from "react";
import * as bar from "./LargeSidebarComponent.style";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import UserSettingProfileComponent from "../UserSettingProfileComponent/UserSettingProfileComponent";

function LargeSidebarComponent() {
    return (
        <bar.div>
            <UserSettingProfileComponent />
            <SideBarOptionComponent icon={<FiSettings />} innerText={"Account Setting"} />
        </bar.div>
    );
}

export default LargeSidebarComponent;
