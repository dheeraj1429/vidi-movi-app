import React from "react";
import * as Home from "./HomePage.style";
import NavbarComponent from "../../Components/NavbarComponent/NavbarComponent";
import HomeComponent from "../../Components/HomeComponent/HomeComponent";

function HomePage() {
    return (
        <Home.div>
            <NavbarComponent />
            <HomeComponent />
        </Home.div>
    );
}

export default HomePage;
