import React from "react";
import * as home from "./HomeComponent.style";
import { Outlet } from "react-router";
import SideBarComponent from "../SideBarComponent/SideBarComponent";

function HomeComponent() {
    return (
        <home.div>
            <SideBarComponent />
            <home.renderDiv>
                <Outlet />
            </home.renderDiv>
        </home.div>
    );
}

export default HomeComponent;
