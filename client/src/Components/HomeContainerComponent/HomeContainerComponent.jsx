import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import HeadingComponent from "../HeadingComponent/HeadingComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import MoviesSmCardsComponent from "../MoviesSmCardsComponent/MoviesSmCardsComponent";
import ContinueWatchingComponent from "../ContinueWatchingComponent/ContinueWatchingComponent";

function HomeContainerComponent() {
    const all_movies = useSelector((state) => state.index.all_movies);
    var settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

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
            <Home.spaceDiv>
                <HeadingComponent heading={"Continue Watching"} />
                <ContinueWatchingComponent />
            </Home.spaceDiv>
            <Home.spaceDiv>
                <HeadingComponent heading={"News Popular"} />
                <Home.moviesShowDiv>
                    <Slider {...settings}>
                        {all_movies && all_movies.success && all_movies.allMoviesDataCollection.length
                            ? all_movies.allMoviesDataCollection
                                  .filter((el) => el.views >= 3)
                                  .sort((a, b) => b.views - a.views)
                                  .map((el) => <MoviesCardsComponent key={el._id} data={el} />)
                            : null}
                    </Slider>
                </Home.moviesShowDiv>
            </Home.spaceDiv>
            <Home.spaceDiv>
                <HeadingComponent heading={"New"} />
                <Home.moviesShowDiv>
                    <Slider {...settings}>
                        {all_movies && all_movies.allMoviesDataCollection.length && all_movies.success
                            ? all_movies.allMoviesDataCollection.map((el) => <MoviesCardsComponent key={el._id} data={el} />)
                            : null}
                    </Slider>
                </Home.moviesShowDiv>
            </Home.spaceDiv>
        </Home.div>
    );
}

export default HomeContainerComponent;
