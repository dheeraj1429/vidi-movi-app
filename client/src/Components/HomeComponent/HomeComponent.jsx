import React from "react";
import SideBarComponent from "../SideBarComponent/SideBarComponent";
import * as home from "./HomeComponent.style";
import { Outlet } from "react-router";

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
