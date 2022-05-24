import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";

function HomeContainerComponent() {
    return (
        <Home.div>
            <BannerComponent />
            <Home.Popular>
                <h1>Trending Now</h1>
            </Home.Popular>
            <Home.moviesShowDiv>
                <MoviesCardsComponent
                    data={{
                        imagePath: "/images/bad-man.jpg",
                        moviName: "Game of Thorne - Red wedding",
                        totalTime: "2hr 00mins",
                        moviAction: "Action",
                    }}
                />
            </Home.moviesShowDiv>
        </Home.div>
    );
}

export default HomeContainerComponent;
