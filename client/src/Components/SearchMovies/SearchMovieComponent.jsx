import React from "react";
import * as search from "./SearchMovieComponent.style";
import { useSelector } from "react-redux";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";

function SearchMoviesInnerComponent() {
    const allSearchMoviesData = useSelector((state) => state.index.allSearchMoviesData);
    const loadingMovies = useSelector((state) => state.index.loadingMovies);

    return (
        <search.div>
            <search.innerDiv>
                {allSearchMoviesData && allSearchMoviesData.searchMoviesRef.length ? (
                    allSearchMoviesData.searchMoviesRef.map((el) => <MoviesCardsComponent key={el._id} data={el} componentStyle={"style_tow"} />)
                ) : loadingMovies ? (
                    <SpnnerComponent />
                ) : null}
            </search.innerDiv>
        </search.div>
    );
}

export default SearchMoviesInnerComponent;
