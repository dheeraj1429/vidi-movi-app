import React from "react";
import * as Home from "./HomePage.style";
import BannerComponent from "../../Components/BannerComponent/BannerComponent";
import NavbarComponent from "../../Components/NavbarComponent/NavbarComponent";

function HomePage() {
    return (
        <Home.div>
            <NavbarComponent />
            <BannerComponent />
        </Home.div>
    );
}

export default HomePage;
