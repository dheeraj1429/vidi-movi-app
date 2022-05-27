import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import { useSelector } from "react-redux";
import MoviesPlayBannerComponent from "../MoviesPlayBannerComponent/MoviesPlayBannerComponent";
import HeadingComponent from "../HeadingComponent/HeadingComponent";

function HomeContainerComponent() {
    const all_movies = useSelector((state) => state.index.all_movies);

    return (
        <Home.div>
            <BannerComponent />
            <HeadingComponent heading={"Trending Now"} />
            <Home.moviesShowDiv>
                {all_movies !== null && all_movies.success === true && all_movies.allMoviesDataCollection.length > 0
                    ? all_movies.allMoviesDataCollection.map(({ _id, ...otherProps }) => <MoviesCardsComponent key={_id} {...otherProps} />)
                    : null}
            </Home.moviesShowDiv>
            <HeadingComponent heading={"Best in 2022"} />
            <MoviesPlayBannerComponent
                data={{
                    backgroundImage: "https://res.cloudinary.com/dw369yzsh/image/upload/v1470916846/banner_background_ez243c.jpg",
                    cardImage: "https://res.cloudinary.com/dw369yzsh/image/upload/v1470917169/deadpool_wn1hwe.jpg",
                }}
            />
        </Home.div>
    );
}

export default HomeContainerComponent;
