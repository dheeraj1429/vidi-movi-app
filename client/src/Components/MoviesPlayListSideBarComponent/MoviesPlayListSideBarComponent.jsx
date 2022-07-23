import React from "react";
import * as movies from "./MoviesPlayListSideBarComponent.style";
import PlalistMovieCardComponent from "../PlayListMovieCardComponent/PlayListMovieCardComponent";

function MoviesPlayListSideBarComponent({ isShow }) {
    return (
        <movies.mainDiv>
            <movies.div className={isShow ? "ShowMovieSidebar" : null}>
                <div>
                    <PlalistMovieCardComponent
                        data={{
                            heading: "new movie",
                            posertImage: "images/bg-whicher.jpg",
                        }}
                    />
                </div>
                <div>
                    <PlalistMovieCardComponent
                        data={{
                            heading: "new movie",
                            posertImage: "images/bg.jpg",
                        }}
                    />
                </div>
            </movies.div>
        </movies.mainDiv>
    );
}

export default MoviesPlayListSideBarComponent;
