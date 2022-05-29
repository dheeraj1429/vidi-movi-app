import styled from "styled-components";

export const div = styled.div`
    width: 100%;
    height: auto;
`;

export const movieDiv = styled.div`
    width: 100%;
    height: 900px;
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
    position: relative;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

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
    height: 5px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`;

export const progressInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--button-cl);
    transition: all 0.6s ease;
`;

export const timeDiv = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
    padding: 1rem;
    p {
        font-size: 12px;
        color: var(--heading-cl);
        margin: 0 0.3rem;
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
        background-color: red;
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
        background-color: var(--progress-cl);
    }

    .range::-webkit-slider-thumb {
        background-color: #aaa;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
`;
