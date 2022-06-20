import styled from "styled-components";

export const div = styled.div`
    width: 100%;

    svg {
        fill: var(--heading-cl);
        transition: all 0.2s ease;
    }

    svg:hover {
        transform: scale(1.1);
    }
    .ant-slider {
        width: 100px;
    }
    .LikeMovie_button {
        fill: var(--spec-static-brand-red);
    }
`;

export const movieDiv = styled.div`
    width: 59%;
    height: 530px;

    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .showVideo {
        visibility: visible;
        opacity: 1;
    }

    video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        visibility: hidden;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .hidebanner {
        opacity: 0;
        visibility: hidden;
    }

    .showControlles {
        display: flow-root;
    }

    .showBufferLoading {
        visibility: visible;
        opacity: 1;
    }

    @media (max-width: 1700px) {
        height: auto;
    }

    @media (max-width: 1660px) {
        width: 100%;
    }

    video {
        position: relative;
    }

    .showPlayButton {
        opacity: 1;
        visibility: visible;
    }

    .ant-slider-track {
        background-color: var(--progress-cl);
    }
`;

export const bufferLoadingDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    img {
        width: 100%;
        height: 100%;
    }
`;

export const bannerDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: all 0.3s ease;
    opacity: 1;
    visibility: visible;
`;

export const playDiv = styled.div`
    width: 70px;
    height: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid #fff;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 1); */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;

    svg {
        fill: white;
        font-size: 40px;
        margin: 0;
    }
`;

export const controllDiv = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    padding: 1rem;
    display: none;
    /* opacity: 0; */
    transition: all 0.5s ease;
    svg {
        fill: white;
        font-size: 20px;
        cursor: pointer;
        margin: 0 1rem;
    }
    #flexDiv {
        display: flex;
        align-items: center;
        width: 100%;
    }

    &:hover {
        opacity: 1;
    }
`;

export const progressBar = styled.div`
    width: 100%;
    background-color: var(--progress-cl);
    height: 3px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`;

export const progressEvetDiv = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 100;
    background-color: transparent;
`;

export const progressInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--button-cl);
    transition: all 0.6s ease;
    z-index: 10;
`;

export const bufferDiv = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #f2f2f2;
    transition: all 0.3s ease;
    border-radius: 30px;
`;

export const timeDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    .inner-timer-options-div {
        display: flex;
        align-items: center;
    }

    p {
        font-size: 12px;
        color: var(--heading-cl);
        margin: 0 0.3rem;
    }

    svg {
        color: var(--main-cl);
    }

    .watch-latet-div svg {
        margin: 0;
        font-size: 12px;
    }
`;

export const soundDiv = styled.div`
    display: flex;
    align-items: center;

    .range {
        -webkit-appearance: none;
        vertical-align: middle;
        outline: none;
        border: none;
        padding: 0;
        background: none;
    }

    .range::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 3px;
        border: 1px solid transparent;
    }

    .range::-webkit-slider-thumb {
        -webkit-appearance: none !important;
        border-radius: 100%;
        background-color: blue;
        height: 12px;
        width: 12px;
        margin-top: -4px;
    }

    .range:active::-ms-thumb {
        border: none;
    }
    .range::-webkit-slider-runnable-track {
    }

    .range::-webkit-slider-thumb {
        background-color: #aaa;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .sound-controlle-div {
        opacity: 0;
        visibility: hidden;
        width: 0;
        transition: all 0.3s ease;
    }

    &:hover .sound-controlle-div {
        opacity: 1;
        visibility: visible;
        width: 100px;
    }
`;
