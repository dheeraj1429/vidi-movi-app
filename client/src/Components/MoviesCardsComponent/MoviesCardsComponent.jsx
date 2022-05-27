import React, { useState, useRef } from "react";
import * as card from "./MoviesCardsComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent";

function MoviesCardsComponent({ name, movieVideo, genra, thumbnailName }) {
    const [IsEnter, setIsEnter] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [HoverTime, setHoverTime] = useState(0);
    const video = useRef(null);

    const MouseEnterHanlder = async function () {
        setIsEnter(true);
        await video.current.play();
    };

    const MouseLeaveHanlder = async function () {
        setIsEnter(false);
        await video.current.pause();
        video.current.currentTime = 0;
        setHoverTime(-1);
        setShowVideo(false);
    };

    const CheckTimeFunction = function () {
        setHoverTime(HoverTime + 1);
        if (HoverTime > 1) {
            setShowVideo(true);
        }
    };

    return (
        <card.div>
            {/* <h3>{name.slice(0, 40)}...</h3> */}
            <card.cartContentDiv className={IsEnter ? "Active-movie-card" : null}>
                <div className="card-hover-div"></div>
                <card.videoDiv>
                    <video webkit-playsinline="true" muted playsinline="true" ref={video} onTimeUpdate={CheckTimeFunction}>
                        <source src={`${backendConfigData.videoUrl}/${movieVideo}`} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                </card.videoDiv>
                <card.moviDiv
                    style={
                        !ShowVideo
                            ? {
                                  backgroundImage: `url(${backendConfigData.imageUrl}/${thumbnailName})`,
                              }
                            : null
                    }
                >
                    <CardsPlayOptionComponent onMouseEnter={MouseEnterHanlder} onMouseLeave={MouseLeaveHanlder} />
                    <card.progressPosDiv>
                        <card.progress>
                            <card.progressInner
                            // style={{
                            //     width: "50%",
                            // }}
                            />
                        </card.progress>
                    </card.progressPosDiv>
                </card.moviDiv>
            </card.cartContentDiv>
        </card.div>
    );
}

export default MoviesCardsComponent;
