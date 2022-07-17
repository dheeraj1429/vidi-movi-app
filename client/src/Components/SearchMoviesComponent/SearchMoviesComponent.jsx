import React, { useEffect } from "react";
import * as search from "./SearchMoviesComponent.style";
import { useParams } from "react-router";
import { getAllSearchMovies } from "../../Redux/Action/indexAction";
import { useDispatch } from "react-redux";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import SearchMoviesInnerComponent from "../SearchMovies/SearchMovieComponent";

function SearchMoviesComponent() {
    const param = useParams().name;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSearchMovies({ searchQuery: param }));
    }, []);

    return (
        <search.div>
            <search.navbarBarDiv>
                <NavbarComponent />
            </search.navbarBarDiv>

            <search.searchDiv>
                <SearchMoviesInnerComponent />
            </search.searchDiv>
        </search.div>
    );
}

export default SearchMoviesComponent;
