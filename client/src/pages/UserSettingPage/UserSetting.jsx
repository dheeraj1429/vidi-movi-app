import React from "react";
import * as setting from "./UserSetting.style";
import LargeSidebarComponent from "../../Components/LargeSidebarComponent/LargeSidebarComponent";
import { Outlet } from "react-router";

function UserSetting() {
    return (
        <setting.div>
            <setting.flexDiv>
                <setting.sidebar>
                    <LargeSidebarComponent />
                </setting.sidebar>
                <setting.options>
                    <Outlet />
                </setting.options>
            </setting.flexDiv>
        </setting.div>
    );
}

export default UserSetting;
