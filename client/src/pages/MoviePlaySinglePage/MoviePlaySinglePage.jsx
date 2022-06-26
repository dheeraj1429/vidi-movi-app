import React from "react";
import * as single from "./MoviePlaySinglePage.style";
import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import SingelVideoContentComponent from "../../Components/SingelVideoContentComponent/SingelVideoContentComponent";

function MoviePlaySinglePage() {
    return (
        <single.div>
            <single.flexDiv>
                <single.moviDiv>
                    <VideoComponent />
                </single.moviDiv>
                <single.contentDiv>
                    <SingelVideoContentComponent />
                </single.contentDiv>
            </single.flexDiv>
        </single.div>
    );
}

export default MoviePlaySinglePage;
