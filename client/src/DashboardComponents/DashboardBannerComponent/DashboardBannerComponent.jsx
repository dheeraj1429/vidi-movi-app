import React from "react";
import * as landing from "./DashboardBannerComponent.style";
import { useSelector } from "react-redux";

function DashboardBannerComponent({ imgUrl, heading, innerPara }) {
    const user = useSelector((state) => state.auth.user);

    return (
        <landing.div>
            {user && user?.data ? (
                <landing.innerDiv class="iq-navbar-header">
                    <div
                        class="container-fluid iq-container"
                        style={{
                            backgroundImage: `url(${imgUrl})`,
                        }}
                    >
                        <div class="row py-5 px-4">
                            <div class="col-md-12">
                                <div class="flex-wrap d-flex justify-content-between align-items-center">
                                    <div>
                                        <h1>{user.data.name}</h1>
                                        <p>{innerPara}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </landing.innerDiv>
            ) : null}
        </landing.div>
    );
}

export default DashboardBannerComponent;
