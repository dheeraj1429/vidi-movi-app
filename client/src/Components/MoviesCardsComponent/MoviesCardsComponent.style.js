import styled from "styled-components";

export const div = styled.div`
    width: 300px;
    height: auto;
    transition: all 0.5s ease;
    margin: 0 0.5rem;
    h3 {
        color: var(--main-cl);
        font-size: 14px;
        margin-top: 0.5rem;
        font-weight: 400;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
    }
    .Active-movie-card {
        transform: scale(1.2) !important;
        z-index: 400;
    }
    video {
        position: absolute;
        width: 308% !important;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &:hover {
        .play-div {
            opacity: 1;
            width: 50px;
            height: 50px;
        }
    }
    &:hover h3 {
        opacity: 0;
    }
    .glightbox_video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.5);
    }
    .outer_circle {
        stroke-width: 3;
        stroke-dasharray: 410;
        stroke-dashoffset: 0;
        stroke-linecap: square;
        transition: all 0.4s ease-out;
    }
    .glightbox_video:hover .outer_circle {
        stroke-dashoffset: 410;
        transition: stroke 0.7s 0.4s ease-out, stroke-dashoffset 0.4s ease-out;
    }

    .glightbox_video:hover .inner-circle {
        fill: #bf2428;
        transition: fill 0.4s 0.3s ease-out;
    }

    .glightbox_video:hover .play {
        fill: white;
        transition: fill 0.4s 0.3s ease-out;
    }
`;

export const videoDiv = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
`;

export const cartContentDiv = styled.div`
    transition: all 0.5s ease;
    position: relative;
    .card-hover-div {
        position: absolute;
        left: 0;
        top: 0;
        width: 0%;
        height: 0%;
        background-color: var(--main-cl);
        transform: scale(1.1);
        border-radius: 5px;
        opacity: 0;
        transition: all 0.4s ease;
    }
    &:hover {
        transform: scale(1);
    }

    /* &:hover .card-hover-div {
        opacity: 1;
        width: 100%;
        height: 100%;
    } */
`;

export const info = styled.div`
    display: flex;
    align-items: center;
    p {
        color: var(--main-cl);
        font-size: 13px;
        margin-right: 0.9rem;
        margin-bottom: 0;
    }
    span {
        color: var(--spec-call-to-action-inverse);
        font-size: 13px;
    }
`;

export const moviDiv = styled.div`
    width: 100%;
    height: 380px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    transition: all 0.3s ease;
    z-index: 10;
    overflow: hidden;
    .movi-information-div {
        transition: all 0.3s ease;
    }

    &:hover .play-div {
        visibility: visible;
    }

    &:hover .movi-information-div {
        bottom: 0px;
    }
`;

export const cartAllDes = styled.div`
    position: absolute;
    bottom: -80px;
    left: 0;
    padding: 0.5rem;
    width: 100%;
    overflow: hidden;
    transition: all 0.3s ease;
`;

export const progressPosDiv = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
`;

export const progress = styled.div`
    position: relative;
    width: 100%;
    height: 2px;
    /* background-color: var(--smooht-gray-cl); */
`;

export const progressInner = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: var(--watch-cl);
    transition: all 0.3s ease;
`;