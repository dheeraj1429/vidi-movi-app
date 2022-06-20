import React from "react";
import * as movie from "./MoviesSearchBarFilterComponent.style";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";

function MoviesSearchBarFilterComponent() {
    return (
        <movie.moviesSearch>
            <BsSearch />
            <input type="search" placeholder="search movies" />
        </movie.moviesSearch>
    );
}

export default MoviesSearchBarFilterComponent;
