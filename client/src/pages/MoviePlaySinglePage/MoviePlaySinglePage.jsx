import React, { useState, useRef, useEffect } from "react";
import * as single from "./MoviePlaySinglePage.style";
import { useSelector } from "react-redux";
import { BsFillPlayFill } from "@react-icons/all-files/bs/BsFillPlayFill";
import { BiPause } from "@react-icons/all-files/bi/BiPause";
import { GiSoundOn } from "@react-icons/all-files/gi/GiSoundOn";
import { GiSoundOff } from "@react-icons/all-files/gi/GiSoundOff";
import { BiFullscreen } from "@react-icons/all-files/bi/BiFullscreen";
import { backendConfigData } from "../../Utils/backendData";

function MoviePlaySinglePage() {
    const [ActiveBtn, setActiveBtn] = useState(false);
    const selectedMovie = useSelector((state) => state.index.selectedMovie);
    const video = useRef(null);
    const playButton = useRef(null);
    const pauseButton = useRef(null);
    const [IsPlay, setIsPlay] = useState(false);
    const CurrentValue = useRef(null);
    const SoundValue = useRef(null);
    const CurrentDuractionValue = useRef(null);
    const [ProgressValue, setProgressValue] = useState(0);
    const [SoundLow, setSoundLow] = useState(false);
    const bufferElem = useRef(null);
    const [WaitFrame, setWaitFrame] = useState(false);

    const ButtonHandler = async function () {
        setActiveBtn(!ActiveBtn);
        await video.current.play();
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
        const videoBufferData = (video.current.buffered.end(0) / video.current.duration) * 100;
        bufferElem.current.style.width = `${videoBufferData}%`;

        const duration = video.current.duration;
        const currentTime = video.current.currentTime;
        const widthValue = (currentTime / duration) * 100;

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
    };

    const PlayAndPauseHandler = function () {
        setIsPlay(!IsPlay);

        if (!IsPlay) {
            video.current.play();
        } else {
            video.current.pause();
        }
    };

    const PlayHandler = function () {
        setIsPlay(true);
    };

    const PauseHandler = function () {
        setIsPlay(false);
    };

    const ChangeHandler = function () {
        const value = SoundValue.current.value;
        if (value === 100 || value > 99) {
            video.current.volume = 1;
        } else {
            video.current.volume = `.${value}`;
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
        const time = (offsetX / offsetWidth) * video.current.duration;
        video.current.currentTime = time;
    };

    const FullScreenHandler = function () {
        if (video.current.requestFullscreen) {
            video.current.requestFullscreen();
        } else if (video.current.webkitRequestFullscreen) {
            /* Safari */
            video.current.webkitRequestFullscreen();
        } else if (video.current.msRequestFullscreen) {
            /* IE11 */
            video.current.msRequestFullscreen();
        }
    };

    useEffect(() => {
        SoundValue.current.value = `${video.current.volume}00`;
    }, []);

    return (
        <>
            {selectedMovie !== null && Object.keys(selectedMovie).length > 0 ? (
                <>
                    <single.div>
                        <single.movieDiv>
                            <single.bannerDiv
                                className={ActiveBtn ? "hidebanner" : null}
                                style={{
                                    backgroundImage: `url(/thumbnail/${selectedMovie.thumbnailName})`,
                                }}
                            ></single.bannerDiv>
                            <div id="play-button-div">
                                <single.playDiv onClick={ButtonHandler}>
                                    <BsFillPlayFill />
                                </single.playDiv>
                            </div>
                            <single.bufferLoadingDiv className={WaitFrame ? "showBufferLoading" : null}>
                                <img src="/images/wating.svg" />
                            </single.bufferLoadingDiv>
                            <video
                                className={ActiveBtn ? "showVideo" : null}
                                src={`${backendConfigData.backendVideoUrl}/${selectedMovie.movieVideo}`}
                                ref={video}
                                onTimeUpdate={TimeUpdateHandler}
                                onPlay={PlayHandler}
                                onPause={PauseHandler}
                                onClick={PlayAndPauseHandler}
                                onWaiting={WaitFunction}
                                onPlaying={VideoPlayHandler}
                            ></video>
                            <single.controllDiv className={ActiveBtn ? "showControlles" : null}>
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

                                            <input
                                                class="range"
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="1"
                                                onmousemove="rangevalue2.value=value"
                                                ref={SoundValue}
                                                onChange={ChangeHandler}
                                            />
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
