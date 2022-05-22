import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";

function HomeContainerComponent() {
    return (
        <Home.div>
            <BannerComponent />
        </Home.div>
    );
}

export default HomeContainerComponent;
