import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import { useSelector } from "react-redux";
import MoviesPlayBannerComponent from "../MoviesPlayBannerComponent/MoviesPlayBannerComponent";
import HeadingComponent from "../HeadingComponent/HeadingComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import MoviesSmCardsComponent from "../MoviesSmCardsComponent/MoviesSmCardsComponent";

function HomeContainerComponent() {
    const all_movies = useSelector((state) => state.index.all_movies);

    return (
        <Home.div>
            <NavbarComponent />
            <BannerComponent
                date={"2019"}
                backgroundImage={"/images/popular.jpg"}
                heading={"GREEN BOOK"}
                subHeading={"ADVENCE, FANTASY, MISTERY"}
                textContent={` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it`}
            />
            <HeadingComponent heading={"Trending Now"} />
            <Home.moviesShowDiv>
                {all_movies !== null && all_movies.success === true && all_movies.allMoviesDataCollection.length > 0
                    ? all_movies.allMoviesDataCollection.map(({ _id, ...otherProps }) => (
                          <MoviesCardsComponent key={_id} {...otherProps} data={Object.assign(otherProps, { _id })} />
                      ))
                    : null}
            </Home.moviesShowDiv>
            <HeadingComponent heading={"Best in 2022"} />
            <MoviesPlayBannerComponent
                data={{
                    backgroundImage: "https://res.cloudinary.com/dw369yzsh/image/upload/v1470916846/banner_background_ez243c.jpg",
                    cardImage: "https://res.cloudinary.com/dw369yzsh/image/upload/v1470917169/deadpool_wn1hwe.jpg",
                }}
            />
            <MoviesSmCardsComponent />
        </Home.div>
    );
}

export default HomeContainerComponent;
