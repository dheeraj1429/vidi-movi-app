import styled from "styled-components";

export const playDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
    cursor: pointer;
    width: 0px;
    height: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    opacity: 0;

    svg {
        color: var(--main-cl);
        font-size: 30px;
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
