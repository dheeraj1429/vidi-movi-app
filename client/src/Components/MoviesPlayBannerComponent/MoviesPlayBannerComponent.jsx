import React from "react";
import * as movies from "./MoviesPlayBannerComponent.style.js";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent.jsx";

function MoviesPlayBannerComponent({ data }) {
    return (
        <movies.div>
            <movies.section
                id="banner"
                class="clearfix"
                style={{
                    background: `url(${data.backgroundImage})`,
                }}
            >
                <div id="banner_content_wrapper">
                    <movies.poster id="poster">
                        <img src={data.cardImage} alt="Deadpool Movie Poster" class="featured_image" />
                    </movies.poster>
                    <movies.content>
                        <h2 class="title">Deadpool</h2>
                        <p class="description">
                            A former Special Forces operative turned mercenary is subjected to a rogue experiment that leaves him with accelerated
                            healing powers, adopting the alter ego Deadpool.
                        </p>

                        <p class="info">
                            R <span>|</span> 108 min <span>|</span> Action, Adventure, Comedy <span>|</span> 12 February 2016
                        </p>
                    </movies.content>
                </div>
            </movies.section>
        </movies.div>
    );
}

export default MoviesPlayBannerComponent;
