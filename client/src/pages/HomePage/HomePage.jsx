import React from "react";
import * as Home from "./HomePage.style";
import BannerComponent from "../../Components/BannerComponent/BannerComponent";

function HomePage() {
    return (
        <Home.div>
            <BannerComponent />
        </Home.div>
    );
}

export default HomePage;
