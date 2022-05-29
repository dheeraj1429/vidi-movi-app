import React, { useState, useRef } from "react";
import * as card from "./MoviesCardsComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent";
import { useDispatch } from "react-redux";
import { selectedMovies } from "../../Redux/Action/indexAction";

function MoviesCardsComponent({ name, movieVideo, genra, thumbnailName, data }) {
    const [IsEnter, setIsEnter] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [HoverTime, setHoverTime] = useState(0);
    const video = useRef(null);
    const dispatch = useDispatch();

    const MouseEnterHanlder = async function () {
        setIsEnter(true);
        // await video.current.play();
    };

    const MouseLeaveHanlder = async function () {
        setIsEnter(false);
        // await video.current.pause();
        // video.current.currentTime = 0;
        setHoverTime(-1);
        setShowVideo(false);
    };

    const CheckTimeFunction = function () {
        setHoverTime(HoverTime + 1);
        if (HoverTime > 1) {
            setShowVideo(true);
        }
    };

    const PlayHandler = function () {
        dispatch(selectedMovies(data));
    };

    return (
        <card.div>
            <card.cartContentDiv className={IsEnter ? "Active-movie-card" : null}>
                {/* <card.videoDiv>
                    <video webkit-playsinline="true" muted playsinline="true" ref={video} onTimeUpdate={CheckTimeFunction}>
                        <source src={`${backendConfigData.videoUrl}/${movieVideo}`} type="video/mp4" />
                    </video>
                </card.videoDiv> */}
                <card.moviDiv
                    style={
                        !ShowVideo
                            ? {
                                  backgroundImage: `url(${backendConfigData.imageUrl}/${thumbnailName})`,
                              }
                            : null
                    }
                >
                    <CardsPlayOptionComponent
                        onMouseEnter={MouseEnterHanlder}
                        onMouseLeave={MouseLeaveHanlder}
                        onClick={PlayHandler}
                        id={data._id}
                        name={data.name}
                    />
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
