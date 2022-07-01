import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import { useSelector } from "react-redux";
import HeadingComponent from "../HeadingComponent/HeadingComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import ContinueWatchingComponent from "../ContinueWatchingComponent/ContinueWatchingComponent";
import MoviesSliderComponent from "../MoviesSliderComponent/MoviesSliderComponent";

function HomeContainerComponent() {
    const user = useSelector((state) => state.auth.user);

    return (
        <Home.div>
            <NavbarComponent />
            <BannerComponent
                date={"2019"}
                backgroundImage={"/images/home-bg.jpg"}
                heading={"GREEN BOOK"}
                subHeading={"ADVENCE, FANTASY, MISTERY"}
                textContent={` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it`}
            />

            {user ? (
                <Home.spaceDiv>
                    <ContinueWatchingComponent />
                </Home.spaceDiv>
            ) : null}

            <Home.spaceDiv>
                <HeadingComponent heading={"New"} />
                <Home.moviesShowDiv>
                    <MoviesSliderComponent />
                </Home.moviesShowDiv>
            </Home.spaceDiv>
        </Home.div>
    );
}

export default HomeContainerComponent;
