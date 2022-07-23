import React from "react";
import * as bar from "./LargeSidebarComponent.style";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import UserSettingProfileComponent from "../UserSettingProfileComponent/UserSettingProfileComponent";
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";

function LargeSidebarComponent() {
    return (
        <bar.div>
            <UserSettingProfileComponent />
            <SideBarOptionComponent icon={<CgProfile />} innerText={"Profile"} />
        </bar.div>
    );
}

export default LargeSidebarComponent;
