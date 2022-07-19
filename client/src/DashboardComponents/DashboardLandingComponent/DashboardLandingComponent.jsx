import React from "react";
import * as dasboard from "./DashboardLandingComponent.style";
import DashboardBannerComponent from "../DashboardBannerComponent/DashboardBannerComponent";
import LoginUserChartComponent from "../LoginUserChartComponent/LoginUserChartComponent";

function DashboardLandingComponent() {
    return (
        <dasboard.div>
            <DashboardBannerComponent imgUrl={"/images/dashboard/top-header.png"} innerPara={"walcome the dahsboard."} />
            <dasboard.contentDiv>
                <LoginUserChartComponent />
            </dasboard.contentDiv>
        </dasboard.div>
    );
}

export default DashboardLandingComponent;
