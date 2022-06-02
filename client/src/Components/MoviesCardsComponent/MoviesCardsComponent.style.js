import styled from "styled-components";

export const mainDiv = styled.div`
    .card_second_cl {
        display: flex;
        align-items: center;
    }

    .flex_card_el {
        width: 500px;
        margin-right: 1rem;
    }
`;

export const div = styled.div`
    height: auto;
    transition: all 0.5s ease;
    margin: 0.5rem 0.5rem;
    position: relative;

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

    @media (max-width: 1600px) {
        width: 100%;
        padding: 0.5rem;
    }
    .close_icons {
        position: absolute;
        fill: white;
        z-index: 100;
        cursor: pointer;
        top: 20px;
        right: 20px;
        font-size: 25px;
        fill: white;
        opacity: 0;
        transition: all 0.3s ease;
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
    &:hover .close_icons {
        opacity: 1;
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
    @media (max-width: 1000px) {
        height: 300px;
    }
    @media (max-width: 800px) {
        height: 300px;
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

export const styledSecond = styled.div`
    h4 {
        color: var(--main-cl);
        font-size: 22px;
        font-weight: 400;
    }
`;
