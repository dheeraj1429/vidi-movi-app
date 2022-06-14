import React, { useState, useRef, useEffect, useCallback } from "react";
import * as single from "./VideoComponent.style";
import { useSelector, useDispatch } from "react-redux";
import { BsFillPlayFill } from "@react-icons/all-files/bs/BsFillPlayFill";
import { BiPause } from "@react-icons/all-files/bi/BiPause";
import { GiSoundOn } from "@react-icons/all-files/gi/GiSoundOn";
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import { backendConfigData } from "../../Utils/backendData";
import { useLocation } from "react-router-dom";
import { fetchSelectedMovi, movieLike, storeHistoryVideo, getAllLikeMovies, selectedMovies } from "../../Redux/Action/indexAction";
import { Slider } from "antd";
import { BiLike } from "@react-icons/all-files/bi/BiLike";
import { CgMiniPlayer } from "@react-icons/all-files/cg/CgMiniPlayer";

function VideoComponent() {
    const selectedMovie = useSelector((state) => state.index.selectedMovie);
    const user = useSelector((state) => state.auth.user);
    const userLikedVideos = useSelector((state) => state.index.userLikedVideos);
    const MoviesIsLiked = useSelector((state) => state.index.MoviesIsLiked);

    const [VideoHandler, setVideoHandler] = useState({
        showControlles: false,
        waitFrame: false,
        isPlay: false,
        videoInPlaylist: false,
        isVideoInPlayList: false,
    });

    const [IsLike, setIsLike] = useState(false);
    const [VideoRef, setVideoRef] = useState();
    const ProgressValue = useRef(null);
    const playButton = useRef(null);
    const pauseButton = useRef(null);
    const CurrentValue = useRef(null);
    const CurrentDuractionValue = useRef(null);
    const bufferElem = useRef(null);

    const loaction = useLocation();
    const dispatch = useDispatch();

    const path = loaction.pathname;
    const id = path.split("/").slice(-1).join("");

    // const ButtonHandler = async function () {
    //     PlayAndPauseHandler();
    //     setVideoHandler({ ...VideoHandler, isPlay: true });
    //     setVideoHandler({ ...VideoHandler, showControlles: !VideoHandler.showControlles });
    // };

    const musicInfoData = function (duraction) {
        let currentHours = Math.floor(duraction / 3600);
        let currentMinutes = Math.floor((duraction - currentHours * 3600) / 60);
        let currentSeconds = Math.floor(duraction - currentHours * 3600 - currentMinutes * 60);

        // when the audio current time is less then 10 seconds then show the current time like 01,02,03....10
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        // return the converted data
        if (currentHours !== 0) {
            return `${currentHours}:${currentMinutes}:${currentSeconds}`;
        } else {
            return `${currentMinutes}:${currentSeconds}`;
        }
    };

    const TimeUpdateHandler = function () {
        if (!!VideoRef && VideoRef.buffered.length > 0) {
            const videoBufferData = (VideoRef.buffered.end(0) / VideoRef.duration) * 100;
            bufferElem.current.style.width = `${videoBufferData}%`;
        }

        const duration = VideoRef.duration;
        const currentTime = VideoRef.currentTime;
        const widthValue = (currentTime / duration) * 100;

        // store the video in history object whne the user whatch almost 19 sec and when the user remove the component from the dom
        // if (currentTime >= 5 && currentTime <= 6) {
        //     setIsHistoryVideo(true);
        // }

        ProgressValue.current.style.width = `${widthValue}%`;

        const currentTimeValue = musicInfoData(currentTime);
        const durationValue = musicInfoData(duration);

        CurrentValue.current.textContent = currentTimeValue;
        CurrentDuractionValue.current.textContent = durationValue;
    };

    const WaitFunction = function () {
        setVideoHandler({ ...VideoHandler, waitFrame: true });
    };

    const VideoPlayHandler = function () {
        setVideoHandler({ ...VideoHandler, waitFrame: false });
    };

    const PlayHandler = useCallback(
        function () {
            setVideoHandler({ ...VideoHandler, isPlay: true });
            console.log("video is play");
        },
        [VideoHandler.isPlay]
    );

    const PauseHandler = useCallback(
        function () {
            setVideoHandler({ ...VideoHandler, isPlay: false });
            console.log("video is pause");
        },
        [VideoHandler.isPlay]
    );

    const PlayAndPauseHandler = async function () {
        VideoRef.muted = false;

        if (!VideoHandler.isPlay) {
            await VideoRef.play();
        } else {
            await VideoRef.pause();
        }
    };

    const ChangeHandler = function (event) {
        const value = event;
        if (value === 100 || value > 99) {
            VideoRef.volume = 1;
        } else if (value < 10) {
            VideoRef.volume = `.0${value}`;
        } else {
            VideoRef.volume = `.${value}`;
        }
    };

    const SickBarHandler = function (e) {
        const { offsetX } = e.nativeEvent;
        const { offsetWidth } = e.nativeEvent.srcElement;
        // const progressBarClickValue = (offsetX / offsetWidth) * 100;

        const time = (offsetX / offsetWidth) * VideoRef.duration;
        VideoRef.currentTime = time;
    };

    const FullScreenHandler = function () {
        if (VideoRef.requestFullscreen) {
            VideoRef.requestFullscreen();
        } else if (VideoRef.webkitRequestFullscreen) {
            /* Safari */
            VideoRef.webkitRequestFullscreen();
        } else if (VideoRef.msRequestFullscreen) {
            /* IE11 */
            VideoRef.msRequestFullscreen();
        }
    };

    const videoRefFunction = useCallback(
        function (el) {
            setVideoRef(el);
        },
        [VideoRef]
    );

    const playMovieHandler = function () {
        VideoRef.load();
        VideoRef.muted = true;
        const promise = VideoRef.play();
        let autoPlayAllowed = true;

        if (promise instanceof Promise) {
            promise
                .then(() => {
                    if (autoPlayAllowed) {
                        VideoRef.muted = false;
                    } else {
                        console.log("auto play is not allow");
                    }
                })
                .catch((error) => {
                    // Check if it is the right error
                    if (error.name === "NotAllowedError") {
                        autoPlayAllowed = false;
                    } else {
                        throw error;
                    }
                });
        } else {
            // Unknown if allowed
            console.log("autoplay unknown");
        }
    };

    useEffect(() => {
        if (selectedMovie && !!userLikedVideos && user && userLikedVideos.length) {
            userLikedVideos.find((el) => {
                if (el.moviesId._id === selectedMovie._id) {
                    setIsLike(true);
                } else {
                    setIsLike(false);
                }
            });
        }

        if (VideoRef) {
            playMovieHandler();
        }

        return () => {
            if (VideoRef) {
                const token = user?.data?.token;
                const getVideoCurrrentTime = VideoRef.currentTime;
                const getVideoDuration = VideoRef.duration;
                const timeWatch = (getVideoCurrrentTime / getVideoDuration) * 100;

                if (!token) return;

                if (getVideoCurrrentTime >= 5) {
                    dispatch(storeHistoryVideo({ id: selectedMovie._id, name: selectedMovie.name, userToken: token, videoWatchTime: timeWatch }));
                }
            }
        };
    }, [selectedMovie, userLikedVideos, VideoRef]);

    useEffect(() => {
        dispatch(fetchSelectedMovi(id));
        dispatch(getAllLikeMovies());

        return () => {
            dispatch(selectedMovies(null));
        };
    }, []);

    const MoviesLikeHandler = function (data) {
        dispatch(movieLike(data));
    };

    const ChangePipHandler = async function () {
        if (!VideoRef) return;
        VideoRef.requestPictureInPicture()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const ChangeVideoHandler = function () {
        setIsLike(!IsLike);
    };

    return (
        <>
            {selectedMovie !== null && Object.keys(selectedMovie).length > 0 ? (
                <>
                    <single.div>
                        <single.movieDiv>
                            {/* <div id="play-button-div">
                                <single.playDiv onClick={ButtonHandler} className={ShowPlayButton ? "" : null}>
                                    <BsFillPlayFill />
                                </single.playDiv>
                            </div> */}

                            <single.bufferLoadingDiv className={VideoHandler.waitFrame ? "showBufferLoading" : null}>
                                <img src="/images/wating.svg" />
                            </single.bufferLoadingDiv>
                            <video
                                className="showVideo"
                                src={`${backendConfigData.backendVideoUrl}/${selectedMovie.movieVideo}`}
                                ref={videoRefFunction}
                                onTimeUpdate={TimeUpdateHandler}
                                onPlay={PlayHandler}
                                onPause={PauseHandler}
                                onClick={() => {
                                    if (VideoRef.webkitDisplayingFullscreen) return;
                                    else PlayAndPauseHandler();
                                }}
                                onWaiting={WaitFunction}
                                onPlaying={VideoPlayHandler}
                                preLoad="auto"
                                id="single_video"
                                allow="autoplay; fullscreen"
                            ></video>
                            <single.controllDiv
                                // className={VideoHandler.showControlles ? "" : null}
                                className="showControlles"
                            >
                                <div id="flexDiv">
                                    {VideoHandler.isPlay ? (
                                        <BiPause ref={pauseButton} onClick={PlayAndPauseHandler} />
                                    ) : (
                                        <BsFillPlayFill ref={playButton} onClick={PlayAndPauseHandler} />
                                    )}

                                    <single.progressBar>
                                        <single.progressEvetDiv onClick={(e) => SickBarHandler(e)} />
                                        <single.bufferDiv ref={bufferElem} />
                                        <single.progressInner ref={(el) => (ProgressValue.current = el)} />
                                    </single.progressBar>
                                </div>
                                <single.timeDiv>
                                    <div className="inner-timer-options-div">
                                        <p
                                            ref={(el) => {
                                                CurrentValue.current = el;
                                            }}
                                        >
                                            00 : 00
                                        </p>
                                        <p>/</p>
                                        <p
                                            ref={(el) => {
                                                CurrentDuractionValue.current = el;
                                            }}
                                        >
                                            00 : 00
                                        </p>
                                        <single.soundDiv>
                                            <GiSoundOn className="sound_elemet" />
                                            <Slider defaultValue={100} onChange={(e) => ChangeHandler(e)} className="sound-controlle-div" />
                                        </single.soundDiv>
                                    </div>
                                    <div className="inner-timer-options-div">
                                        <BiLike
                                            className={(!!MoviesIsLiked && MoviesIsLiked.success) || IsLike ? "LikeMovie_button" : null}
                                            onClick={() => {
                                                MoviesLikeHandler({ id: selectedMovie._id, movieVideo: selectedMovie.movieVideo });
                                                ChangeVideoHandler();
                                            }}
                                        />
                                        <CgMiniPlayer onClick={ChangePipHandler} />
                                        <BiFullscreen onClick={FullScreenHandler} />
                                    </div>
                                </single.timeDiv>
                            </single.controllDiv>
                        </single.movieDiv>
                    </single.div>
                </>
            ) : null}
        </>
    );
}

export default VideoComponent;
