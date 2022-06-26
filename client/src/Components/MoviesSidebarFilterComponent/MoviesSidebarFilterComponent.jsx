import React, { useCallback } from "react";
import * as movie from "./MoviesSidebarFilterComponent.style";
import MoviesSearchBarFilterComponent from "../MoviesSearchBarFilterComponent/MoviesSearchBarFilterComponent";
import MoviesFilterListComponent from "../MoviesFilterListComponent/MoviesFilterListComponent";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { removeUserAllHistory, removeALlSelectedMovies } from "../../Redux/Action/indexAction";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { BiSelectMultiple } from "@react-icons/all-files/bi/BiSelectMultiple";
import { showSelectedOptions } from "../../Redux/Action/appAction";
import { Popconfirm } from "antd";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { useCookies } from "react-cookie";

function MoviesSidebarFilterComponent() {
    const dispatch = useDispatch();
    const checkBox = useSelector((state) => state.index.showSelectedOptions);
    const storeSelectedMoviesId = useSelector((state) => state.index.storeSelectedMoviesId);
    const [cookie] = useCookies(["user"]);

    const DeleteHistoryHandler = useCallback(
        debounce(() => {
            dispatch(removeUserAllHistory(null));
        }, 600),
        []
    );

    const DeleteSelectedHandler = function () {
        dispatch(showSelectedOptions(!checkBox));
    };

    const confirm = function () {
        if (!!storeSelectedMoviesId.length && cookie.user) {
            dispatch(removeALlSelectedMovies({ moviesId: storeSelectedMoviesId, token: cookie.user.data.token }));
            dispatch(showSelectedOptions(false));
        }
    };

    return (
        <movie.div>
            <MoviesSearchBarFilterComponent />
            <MoviesFilterListComponent icon={<AiOutlineDelete />} innertext={"CLEAR ALL WATCH HISTORY"} onClick={DeleteHistoryHandler} />
            <MoviesFilterListComponent icon={<BiSelectMultiple />} innertext={"Delete Selected Movies"} onClick={DeleteSelectedHandler} />
            {!!storeSelectedMoviesId.length ? (
                <MoviesFilterListComponent>
                    <Popconfirm title="it will be permanently deleted. Movies cannot be recovered." onConfirm={confirm}>
                        <movie.flexDiv>
                            <MdDeleteForever />
                            <p>Delete Selecte Movies</p>
                        </movie.flexDiv>
                    </Popconfirm>
                </MoviesFilterListComponent>
            ) : null}
        </movie.div>
    );
}

export default MoviesSidebarFilterComponent;
