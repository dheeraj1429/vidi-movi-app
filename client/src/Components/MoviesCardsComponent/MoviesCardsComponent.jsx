import React, { useState, useRef } from "react";
import * as card from "./MoviesCardsComponent.style";
import { useDispatch } from "react-redux";
import { overlayDiv } from "../../Redux/Action/indexAction";

function MoviesCardsComponent({ name, movieVideo, genra, thumbnailName }) {
    const [IsEnter, setIsEnter] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);
    const [HoverTime, setHoverTime] = useState(0);
    const video = useRef(null);

    const dispatch = useDispatch();

    const MouseEnterHanlder = function () {
        setIsEnter(true);
        dispatch(overlayDiv(true));

        // const promise = video.current.play();

        // if (promise !== undefined) {
        //     promise
        //         .then((res) => {})
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }
    };

    const MouseLeaveHanlder = async function () {
        setIsEnter(false);
        dispatch(overlayDiv(false));
        // await video.current.pause();
        // video.current.currentTime = 0;
        // setHoverTime(-1);
        // setShowVideo(false);
    };

    const CheckTimeFunction = function () {
        // setHoverTime(HoverTime + 1);
        // if (HoverTime > 8) {
        //     setShowVideo(true);
        // }
    };

    return (
        <card.div>
            <card.cartContentDiv className={IsEnter ? "Active-movie-card" : null}>
                <div className="card-hover-div"></div>
                {/* <video webkit-playsinline="true" muted playsinline="true" ref={video} onTimeUpdate={CheckTimeFunction}>
                    <source src={`/videos/${movieVideo}`} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video> */}
                <card.moviDiv
                    style={
                        !ShowVideo
                            ? {
                                  backgroundImage: `url(/thumbnail/${thumbnailName})`,
                              }
                            : null
                    }
                >
                    <card.playDiv className="play-div" onMouseEnter={MouseEnterHanlder} onMouseLeave={MouseLeaveHanlder}>
                        <a class="glightbox_video">
                            <svg width="131" height="131" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    class="inner-circle"
                                    d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z"
                                    fill="white"
                                ></path>
                                <circle class="outer_circle" cx="65.5" cy="65.5" r="64" stroke="white"></circle>
                                <path class="play" fill-rule="evenodd" clip-rule="evenodd" d="M60 76V57L77 66.7774L60 76Z" fill="#BF2428"></path>
                            </svg>
                        </a>
                    </card.playDiv>

                    {/* <card.cartAllDes className="movi-information-div">
                        <h3>{name}</h3>
                        <card.info>
                            <span>{genra}</span>
                        </card.info>
                    </card.cartAllDes> */}

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
