import React, { useState } from "react";
import * as playlist from "./MoviesPlayListComponent.style";
import MoviesBannerComponent from "../MoviesBannerComponent/MoviesBannerComponent";
import MoviesPlayListSideBarComponent from "../MoviesPlayListSideBarComponent/MoviesPlayListSideBarComponent";
import PlayListMovieCardComponent from "../PlayListMovieCardComponent/PlayListMovieCardComponent";

function MoviesPlayListComponent() {
    const [ShowPlayListVideos, setShowPlayListVideos] = useState(false);

    const playListHandler = function () {
        setShowPlayListVideos(!ShowPlayListVideos);
    };

    return (
        <playlist.div>
            <MoviesBannerComponent />
            <playlist.marginDiv>
                <playlist.flexDiv>
                    <div>
                        <PlayListMovieCardComponent onClik={playListHandler} />
                    </div>
                </playlist.flexDiv>
            </playlist.marginDiv>
            <MoviesPlayListSideBarComponent isShow={ShowPlayListVideos} />
        </playlist.div>
    );
}

export default MoviesPlayListComponent;
