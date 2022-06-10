import React, { useState, useRef, useEffect } from "react";
import * as single from "./MoviePlaySinglePage.style";
import { useSelector, useDispatch } from "react-redux";
import { BsFillPlayFill } from "@react-icons/all-files/bs/BsFillPlayFill";
import { BiPause } from "@react-icons/all-files/bi/BiPause";
import { GiSoundOn } from "@react-icons/all-files/gi/GiSoundOn";
import { GiSoundOff } from "@react-icons/all-files/gi/GiSoundOff";
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import { backendConfigData } from "../../Utils/backendData";
import { useLocation } from "react-router-dom";
import {
    fetchSelectedMovi,
    movieLike,
    storeHistoryVideo,
    getAllLikeMovies,
    selectedMovies,
    videoViewsFunction,
    userPlayListVideo,
    getUserPlayListVideo,
    setVideoCurrentTime,
} from "../../Redux/Action/indexAction";
import { Slider } from "antd";
import { BiLike } from "@react-icons/all-files/bi/BiLike";
import { CgMiniPlayer } from "@react-icons/all-files/cg/CgMiniPlayer";
import { CgPlayList } from "@react-icons/all-files/cg/CgPlayList";
import { CgPlayListCheck } from "@react-icons/all-files/cg/CgPlayListCheck";

function MoviePlaySinglePage() {
    const selectedMovie = useSelector((state) => state.index.selectedMovie);
    const user = useSelector((state) => state.auth.user);
    const userLikedVideos = useSelector((state) => state.index.userLikedVideos);
    const isPLayListSave = useSelector((state) => state.index.isPLayListSave);
    const userAllVideoPlayList = useSelector((state) => state.index.userAllVideoPlayList);
    const MoviesIsLiked = useSelector((state) => state.index.MoviesIsLiked);

    const [ShowPlayButton, setShowPlayButton] = useState(true);
    const [IsHistoryVideo, setIsHistoryVideo] = useState(false);
    const [VideoHandler, setVideoHandler] = useState({
        isFullScreen: false,
        showControlles: false,
        waitFrame: false,
        isPlay: false,
        soundLow: false,
        videoInPlaylist: false,
        isVideoInPlayList: false,
    });
    const [IsLike, setIsLike] = useState(false);
    const [video, setVideo] = useState();
    const playButton = useRef(null);
    const pauseButton = useRef(null);
    const CurrentValue = useRef(null);
    const CurrentDuractionValue = useRef(null);
    const [ProgressValue, setProgressValue] = useState(0);
    const bufferElem = useRef(null);

    const loaction = useLocation();
    const dispatch = useDispatch();

    const path = loaction.pathname;
    const id = path.split("/").slice(-1).join("");

    const ButtonHandler = async function () {
        PlayAndPauseHandler();
        setVideoHandler({ ...VideoHandler, isPlay: true });
        setVideoHandler({ ...VideoHandler, showControlles: !VideoHandler.showControlles });
    };

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
        if (video && video.buffered.length > 0) {
            const videoBufferData = (video.buffered.end(0) / video.duration) * 100;
            bufferElem.current.style.width = `${videoBufferData}%`;
        }

        const duration = video.duration;
        const currentTime = video.currentTime;
        const widthValue = (currentTime / duration) * 100;

        if (currentTime > 5) {
            setIsHistoryVideo(true);
        }

        setProgressValue(widthValue);

        const currentTimeValue = musicInfoData(currentTime);
        const durationValue = musicInfoData(duration);

        CurrentValue.current.textContent = currentTimeValue;
        CurrentDuractionValue.current.textContent = durationValue;

        if (currentTime === duration) {
            setVideoHandler({ ...VideoHandler, isPlay: false });
        }
    };

    const WaitFunction = function () {
        setVideoHandler({ ...VideoHandler, waitFrame: true });
    };

    const VideoPlayHandler = function () {
        setVideoHandler({ ...VideoHandler, waitFrame: false });
        setShowPlayButton(false);
    };

    const PlayAndPauseHandler = async function () {
        setVideoHandler({ ...VideoHandler, isPlay: !VideoHandler.isPlay });
        setVideoHandler({ ...VideoHandler, showControlles: true });
        video.muted = false;

        if (!VideoHandler.isPlay) {
            await video.play();
            setShowPlayButton(false);
        } else {
            await video.pause();
            setShowPlayButton(true);
        }
    };

    const PlayHandler = function () {
        setVideoHandler({ ...VideoHandler, isPlay: true });
    };

    const PauseHandler = function () {
        setVideoHandler({ ...VideoHandler, isPlay: false });
    };

    const ChangeHandler = function (event) {
        const value = event;
        if (value === 100 || value > 99) {
            video.volume = 1;
        } else if (value < 10) {
            video.volume = `.0${value}`;
        } else {
            video.volume = `.${value}`;
        }

        if (value === 0 || value < 1) {
            setVideoHandler({ ...VideoHandler, soundLow: true });
        } else {
            setVideoHandler({ ...VideoHandler, soundLow: false });
        }
    };

    const SickBarHandler = function (e) {
        const { offsetX } = e.nativeEvent;
        const { offsetWidth } = e.nativeEvent.srcElement;
        const progressBarClickValue = (offsetX / offsetWidth) * 100;

        setProgressValue(progressBarClickValue);
        const time = (offsetX / offsetWidth) * video.duration;
        video.currentTime = time;
    };

    const FullScreenHandler = function () {
        setVideoHandler({ ...VideoHandler, isFullScreen: true });
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            /* Safari */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            /* IE11 */
            video.msRequestFullscreen();
        }
    };

    useEffect(() => {
        if (IsHistoryVideo && selectedMovie) {
            const token = user?.data?.token;
            if (token) {
                dispatch(storeHistoryVideo({ id: selectedMovie._id, name: selectedMovie.name, userToken: token }));
            }
            dispatch(videoViewsFunction({ id: selectedMovie._id, name: selectedMovie.name }));
        }

        if (userAllVideoPlayList && selectedMovie && userAllVideoPlayList.userPlayLists) {
            userAllVideoPlayList.userPlayLists.find((el) => {
                if (el._id === selectedMovie._id) {
                    setVideoHandler({ ...VideoHandler, isVideoInPlayList: true });
                }
            });
        }

        if (selectedMovie && userLikedVideos !== null && userLikedVideos.success !== false) {
            userLikedVideos.find((el) => {
                if (el._id === selectedMovie._id) {
                    setIsLike(true);
                } else {
                    setIsLike(false);
                }
            });
        }
    }, [IsHistoryVideo, selectedMovie, userLikedVideos, userAllVideoPlayList]);

    useEffect(() => {
        dispatch(fetchSelectedMovi(id));
        dispatch(getAllLikeMovies());
        dispatch(getUserPlayListVideo());

        return () => {
            dispatch(selectedMovies(null));
        };
    }, []);

    const MoviesLikeHandler = function (data) {
        dispatch(movieLike(data));
    };

    const playMovieHandler = function () {
        video.load();
        video.muted = true;
        const promise = video.play();
        let autoPlayAllowed = true;

        if (promise instanceof Promise) {
            promise
                .then(() => {
                    if (autoPlayAllowed) {
                        video.muted = false;
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

    const LikeHandler = function () {
        setIsLike(!IsLike);
    };

    const ChangePipHandler = async function () {
        if (!video) return;

        video
            .requestPictureInPicture()
            .then((res) => {})
            .catch((err) => {
                console.log(err);
            });
    };

    const IsePlayHandler = function () {
        const token = user?.data?.token;
        if (token) {
            setVideoHandler({ ...VideoHandler, isVideoInPlayList: false });
            dispatch(userPlayListVideo({ id: selectedMovie._id, name: selectedMovie.name, userToken: token }));
        }
    };

    useEffect(() => {
        if (video) {
            playMovieHandler();
            ChangePipHandler();
        }

        return () => {
            if (video) {
                const getVideoCurrrentTime = video.currentTime;
                const getVideoDuration = video.duration;
                const timeWatch = (getVideoCurrrentTime / getVideoDuration) * 100;
                dispatch(setVideoCurrentTime({ videoWatchTime: timeWatch, movie: selectedMovie._id }));
            }
        };
    }, [video]);

    return (
        <>
            {selectedMovie !== null && Object.keys(selectedMovie).length > 0 ? (
                <>
                    <single.div>
                        <single.movieDiv>
                            <div id="play-button-div">
                                <single.playDiv onClick={ButtonHandler} className={ShowPlayButton ? "showPlayButton" : null}>
                                    <BsFillPlayFill />
                                </single.playDiv>
                            </div>

                            <single.bufferLoadingDiv className={VideoHandler.waitFrame ? "showBufferLoading" : null}>
                                <img src="/images/wating.svg" />
                            </single.bufferLoadingDiv>
                            <video
                                className="showVideo"
                                src={`${backendConfigData.backendVideoUrl}/${selectedMovie.movieVideo}`}
                                ref={(video) => setVideo(video)}
                                onTimeUpdate={TimeUpdateHandler}
                                onPlay={PlayHandler}
                                onPause={PauseHandler}
                                onClick={!VideoHandler.isFullScreen ? () => PlayAndPauseHandler() : null}
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
                                        <single.progressInner
                                            style={{
                                                width: `${ProgressValue}%`,
                                            }}
                                        />
                                    </single.progressBar>
                                </div>
                                <single.timeDiv>
                                    <div className="inner-timer-options-div">
                                        <p ref={CurrentValue}>00 : 00</p>
                                        <p>/</p>
                                        <p ref={CurrentDuractionValue}>00 : 00</p>
                                        <single.soundDiv>
                                            {VideoHandler.soundLow ? <GiSoundOff className="sound_elemet" /> : <GiSoundOn className="sound_elemet" />}
                                            <Slider defaultValue={100} onChange={(e) => ChangeHandler(e)} className="sound-controlle-div" />
                                        </single.soundDiv>
                                    </div>
                                    <div className="inner-timer-options-div">
                                        <BiLike
                                            className={
                                                (MoviesIsLiked !== null && MoviesIsLiked.success === true) || IsLike ? "LikeMovie_button" : null
                                            }
                                            onClick={() => {
                                                MoviesLikeHandler({ id: selectedMovie._id, movieVideo: selectedMovie.movieVideo });
                                                LikeHandler();
                                            }}
                                        />
                                        <CgMiniPlayer onClick={ChangePipHandler} />
                                        <BiFullscreen onClick={FullScreenHandler} />
                                        {(isPLayListSave !== null && isPLayListSave.success === true) || VideoHandler.isVideoInPlayList ? (
                                            <CgPlayListCheck onClick={IsePlayHandler} />
                                        ) : CgPlayListCheck && !CgPlayListCheck.success ? (
                                            <CgPlayList onClick={IsePlayHandler} />
                                        ) : (
                                            <CgPlayList onClick={IsePlayHandler} />
                                        )}
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

export default MoviePlaySinglePage;
