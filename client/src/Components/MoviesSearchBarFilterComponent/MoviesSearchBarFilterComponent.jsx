import React, { useState } from "react";
import * as movie from "./MoviesSearchBarFilterComponent.style";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { useDispatch } from "react-redux";
import { searchHistoryMovies } from "../../Redux/Action/indexAction";

function MoviesSearchBarFilterComponent() {
    const [MovieSearch, setMovieSearch] = useState("");
    const dispatch = useDispatch();

    const ChangeHandler = function (e) {
        const value = e.target.value;
        setMovieSearch(value);
    };

    const SearchHandler = function () {
        if (!!MovieSearch.length) {
            dispatch(searchHistoryMovies(MovieSearch));
        }
    };

    return (
        <movie.moviesSearch>
            <BsSearch onClick={SearchHandler} />
            <input type="search" value={MovieSearch} onChange={ChangeHandler} placeholder="search movies" />
        </movie.moviesSearch>
    );
}

export default MoviesSearchBarFilterComponent;
