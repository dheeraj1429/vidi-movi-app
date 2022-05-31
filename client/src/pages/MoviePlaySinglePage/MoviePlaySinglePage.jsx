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
import { fetchSelectedMovi } from "../../Redux/Action/indexAction";
import { Slider } from "antd";
import { storeHistoryVideo } from "../../Redux/Action/indexAction";

function MoviePlaySinglePage() {
    const selectedMovie = useSelector((state) => state.index.selectedMovie);
    const user = useSelector((state) => state.auth.user);
    const [ShowPlayButton, setShowPlayButton] = useState(true);
    const [IsHistoryVideo, setIsHistoryVideo] = useState(false);
    const [video, setVideo] = useState();
    const playButton = useRef(null);
    const pauseButton = useRef(null);
    const [IsPlay, setIsPlay] = useState(false);
    const CurrentValue = useRef(null);
    const CurrentDuractionValue = useRef(null);
    const [ProgressValue, setProgressValue] = useState(0);
    const [SoundLow, setSoundLow] = useState(false);
    const bufferElem = useRef(null);
    const [WaitFrame, setWaitFrame] = useState(false);
    const loaction = useLocation();
    const dispatch = useDispatch();

    const path = loaction.pathname;
    const id = path.split("/").slice(-1).join("");

    const ButtonHandler = async function () {
        video.load();
        PlayAndPauseHandler();
        setIsPlay(true);
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

        if (currentTime > 15) {
            setIsHistoryVideo(true);
        }

        setProgressValue(widthValue);

        const currentTimeValue = musicInfoData(currentTime);
        const durationValue = musicInfoData(duration);

        CurrentValue.current.textContent = currentTimeValue;
        CurrentDuractionValue.current.textContent = durationValue;

        if (currentTime === duration) {
            setIsPlay(false);
        }
    };

    const WaitFunction = function () {
        setWaitFrame(true);
    };

    const VideoPlayHandler = function () {
        setWaitFrame(false);
        setShowPlayButton(false);
    };

    const PlayAndPauseHandler = async function () {
        setIsPlay(!IsPlay);

        if (!IsPlay) {
            await video.play();
            setShowPlayButton(false);
        } else {
            await video.pause();
            setShowPlayButton(true);
        }
    };

    const PlayHandler = function () {
        setIsPlay(true);
    };

    const PauseHandler = function () {
        setIsPlay(false);
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
            setSoundLow(true);
        } else {
            setSoundLow(false);
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
        if (IsHistoryVideo) {
            const token = user.data.token;
            dispatch(storeHistoryVideo({ id: selectedMovie._id, name: selectedMovie.name, userToken: token }));
        }
    }, [IsHistoryVideo]);

    useEffect(() => {
        dispatch(fetchSelectedMovi(id));
    }, []);

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

                            <single.bufferLoadingDiv className={WaitFrame ? "showBufferLoading" : null}>
                                <img src="/images/wating.svg" />
                            </single.bufferLoadingDiv>
                            <video
                                className="showVideo"
                                src={`${backendConfigData.backendVideoUrl}/${selectedMovie.movieVideo}`}
                                ref={(video) => setVideo(video)}
                                onTimeUpdate={TimeUpdateHandler}
                                onPlay={PlayHandler}
                                onPause={PauseHandler}
                                onClick={PlayAndPauseHandler}
                                onWaiting={WaitFunction}
                                onPlaying={VideoPlayHandler}
                                preLoad="auto"
                                id="single_video"
                                allow="autoplay; fullscreen"
                            ></video>
                            <single.controllDiv className="showControlles">
                                <div id="flexDiv">
                                    {IsPlay ? (
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
                                            {SoundLow ? <GiSoundOff /> : <GiSoundOn />}
                                            <Slider defaultValue={100} onChange={(e) => ChangeHandler(e)} />
                                        </single.soundDiv>
                                    </div>
                                    <div className="inner-timer-options-div">
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

export default MoviePlaySinglePage;
