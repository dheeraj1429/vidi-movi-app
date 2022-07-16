import React from "react";
import * as tranding from "./TrandingMoviesComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import MoviesSliderComponent from "../MoviesSliderComponent/MoviesSliderComponent";
import HeadingComponent from "../HeadingComponent/HeadingComponent";

function TrandingMoviesComponent() {
    return (
        <tranding.div>
            <BannerComponent
                backgroundImage={"/images/tranding-wp.jpg"}
                heading={"TRANDING MOVIES"}
                //  subHeading={"ADVENCE, FANTASY, MISTERY"}
            />

            <tranding.moviesCardDiv>
                <tranding.spaceDiv>
                    <HeadingComponent heading={"Tranding Movies"} />
                    <MoviesSliderComponent filterByViews={true} />
                </tranding.spaceDiv>
            </tranding.moviesCardDiv>
        </tranding.div>
    );
}

export default TrandingMoviesComponent;
