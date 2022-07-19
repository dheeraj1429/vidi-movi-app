import React, { useLayoutEffect } from "react";
import * as dashboard from "./DashboardPage.style";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router";
import DashboardNavbarComponent from "../../DashboardComponents/DashboardNavbarComponent/DashboardNavbarComponent";
import DashboardSiderComponent from "../../DashboardComponents/DashboardSiderComponent/DashboardSiderComponent";

function DashboardPage() {
    const [cookie] = useCookies(["user"]);
    const navigation = useNavigate();

    useLayoutEffect(() => {
        const user = cookie.user;
        if (user === undefined || user.data.admin !== "admin" || user.data === undefined) {
            navigation("/");
        }
    }, []);

    return (
        <>
            <dashboard.mainDiv>
                <div className="navbar-div">
                    <DashboardNavbarComponent />
                </div>
                <dashboard.div>
                    <dashboard.side>
                        <DashboardSiderComponent />
                    </dashboard.side>
                    <dashboard.renderDiv id="rander_div">
                        <Outlet />
                    </dashboard.renderDiv>
                </dashboard.div>
            </dashboard.mainDiv>
        </>
    );
}

export default DashboardPage;
