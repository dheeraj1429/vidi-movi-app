import React, { useCallback } from "react";
import * as movie from "./MoviesSidebarFilterComponent.style";
import MoviesSearchBarFilterComponent from "../MoviesSearchBarFilterComponent/MoviesSearchBarFilterComponent";
import MoviesFilterListComponent from "../MoviesFilterListComponent/MoviesFilterListComponent";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { removeUserAllHistory } from "../../Redux/Action/indexAction";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";

function MoviesSidebarFilterComponent() {
    const dispatch = useDispatch();

    const DeleteHistoryHandler = useCallback(
        debounce(() => {
            dispatch(removeUserAllHistory(null));
        }, 600),
        []
    );

    return (
        <movie.div>
            <MoviesSearchBarFilterComponent />
            <MoviesFilterListComponent icon={<AiOutlineDelete />} innertext={"CLEAR ALL WATCH HISTORY"} onClick={DeleteHistoryHandler} />
        </movie.div>
    );
}

export default MoviesSidebarFilterComponent;
