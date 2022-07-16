import React from "react";
import * as cards from "./AllMoviesCardComponent.style";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";

function AllMoviesCardComponent({ filterByViews }) {
    const all_movies = useSelector((state) => state.index.all_movies);

    var settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 700,
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
        <cards.div>
            <Slider {...settings}>
                {all_movies && !!all_movies.allMoviesDataCollection.length && all_movies.success && !filterByViews
                    ? all_movies.allMoviesDataCollection.map((el) => <MoviesCardsComponent key={el._id} data={el} />)
                    : all_movies && !!all_movies.allMoviesDataCollection.length && all_movies.success && filterByViews
                    ? all_movies.allMoviesDataCollection
                          .filter((el) => el.views >= 10)
                          .sort((a, b) => b.views - a.views)
                          .map((el) => <MoviesCardsComponent key={el._id} data={el} />)
                    : null}
            </Slider>
        </cards.div>
    );
}

export default AllMoviesCardComponent;
