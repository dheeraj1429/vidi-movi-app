import React, { useEffect } from "react";
import * as dashboard from "./DashboardPage.style";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router";

// dashboard components
import DashboardSiderComponent from "../../DashboardComponents/DashboardSiderComponent/DashboardSiderComponent";

function DashboardPage() {
    const [cookie] = useCookies(["user"]);
    const navigation = useNavigate();

    useEffect(() => {
        const user = cookie.user;
        if (user === undefined || user.data.admin !== "admin" || user.data === undefined) {
            navigation("/");
        }
    }, []);

    return (
        <dashboard.div>
            <DashboardSiderComponent />
            <dashboard.renderDiv>
                <Outlet />
            </dashboard.renderDiv>
        </dashboard.div>
    );
}

export default DashboardPage;
