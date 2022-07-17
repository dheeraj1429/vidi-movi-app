import React from "react";
import * as dasboard from "./DashboardLandingComponent.style";
import DashboardBannerComponent from "../DashboardBannerComponent/DashboardBannerComponent";

function DashboardLandingComponent() {
    return (
        <dasboard.div>
            <DashboardBannerComponent imgUrl={"/images/dashboard/top-header.png"} heading={"Hello Admin!"} innerPara={"walcome the dahsboard."} />
        </dasboard.div>
    );
}

export default DashboardLandingComponent;
