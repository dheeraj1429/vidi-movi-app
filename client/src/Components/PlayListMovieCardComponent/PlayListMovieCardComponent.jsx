import React from "react";
import * as playlist from "./PlayListMovieCardComponent.style";

function PlalistMovieCardComponent({ onClik, data }) {
    return (
        <playlist.movieCard onClick={onClik ? onClik : null}>
            <div
                className="hoverBanner_div"
                style={
                    data
                        ? {
                              backgroundImage: `url(${data.posertImage})`,
                          }
                        : null
                }
            ></div>
            <h5>{data ? data.heading : "My Mix"}</h5>
        </playlist.movieCard>
    );
}

export default PlalistMovieCardComponent;
