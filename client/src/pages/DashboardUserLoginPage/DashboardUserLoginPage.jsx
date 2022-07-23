import React from "react";
import * as loginUser from "./DashboardUserLoginPage.style";
import DashboardLoginComponent from "../../DashboardComponents/DashboardLoginComponent/DashboardLoginComponent";

function DashboardUserLoginPage() {
    return (
        <loginUser.div>
            <loginUser.flexDiv>
                <DashboardLoginComponent />
                <loginUser.imageDiv />
            </loginUser.flexDiv>
        </loginUser.div>
    );
}

export default DashboardUserLoginPage;
