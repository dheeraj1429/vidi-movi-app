import React from "react";
import * as banner from "./MoviesBannerComponent.style";
import NavbarComponent from "../NavbarComponent/NavbarComponent";

function MoviesBannerComponent() {
    return (
        <banner.div
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)), url("images/whicher-bg.jpg")`,
            }}
        >
            <NavbarComponent />
            <banner.innerDiv>
                <banner.headingDiv>
                    <h1>Explore</h1>
                    <div className="line_div"></div>
                </banner.headingDiv>
            </banner.innerDiv>
        </banner.div>
    );
}

export default MoviesBannerComponent;
