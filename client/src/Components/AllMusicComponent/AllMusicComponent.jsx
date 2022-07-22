import React, { useEffect } from "react";
import * as music from "./AllMusicComponent.style";
import { BiDotsHorizontalRounded } from "@react-icons/all-files/bi/BiDotsHorizontalRounded";
import MoviesSliderComponent from "../MoviesSliderComponent/MoviesSliderComponent";
import { getAllMovies } from "../../Redux/Action/indexAction";
import { useDispatch } from "react-redux";

function AllMusicComponent() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMovies());
    }, []);

    return (
        <music.div>
            <music.flexDiv>
                <div>
                    <h1>Discover</h1>
                    <p>All Music</p>
                </div>
                <div>
                    <BiDotsHorizontalRounded />
                </div>
            </music.flexDiv>

            <moviShow>
                <MoviesSliderComponent filterBy={"Song"} />
            </moviShow>
        </music.div>
    );
}

export default AllMusicComponent;
