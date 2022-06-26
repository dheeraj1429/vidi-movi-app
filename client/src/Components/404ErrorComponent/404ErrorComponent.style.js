import styled from "styled-components";

export const div = styled.div`
    h1 {
        -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
        animation: swing var(--speed) infinite alternate ease-in-out;
        font-size: clamp(5rem, 40vmin, 20rem);
        font-family: "Open Sans", sans-serif;
        margin: 0;
        margin-bottom: 1rem;
        letter-spacing: 1rem;
        transform: translate3d(0, 0, 0vmin);
        --x: calc(50% + (var(--swing-x) * 0.5) * 1%);
        background: radial-gradient(var(--lit-header), var(--header) 45%) var(--x) 100%/200% 200%;
        color: transparent;
    }
    h1:after {
        -webkit-animation: swing var(--speed) infinite alternate ease-in-out;
        animation: swing var(--speed) infinite alternate ease-in-out;
        content: "404";
        position: absolute;
        top: 0;
        left: 0;
        color: var(--shadow);
        filter: blur(1.5vmin);
        transform: scale(1.05) translate3d(0, 12%, -10vmin) translate(calc((var(--swing-x, 0) * 0.05) * 1%), calc((var(--swing-y) * 0.05) * 1%));
    }
    .cloak {
        animation: swing var(--speed) infinite alternate-reverse ease-in-out;
        height: 100%;
        width: 100%;
        transform-origin: 50% 30%;
        transform: rotate(calc(var(--swing-x) * -0.25deg));
        background: radial-gradient(40% 40% at 50% 42%, transparent, #000 35%);
    }
    .cloak__wrapper {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
    .cloak__container {
        height: 250vmax;
        width: 250vmax;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .info {
        text-align: center;
        line-height: 1.5;
        max-width: clamp(16rem, 90vmin, 25rem);
    }
    .info > p {
        margin-bottom: 3rem;
    }
    @-webkit-keyframes swing {
        0% {
            --swing-x: -100;
            --swing-y: -100;
        }
        50% {
            --swing-y: 0;
        }
        100% {
            --swing-y: -100;
            --swing-x: 100;
        }
    }
    @keyframes swing {
        0% {
            --swing-x: -100;
            --swing-y: -100;
        }
        50% {
            --swing-y: 0;
        }
        100% {
            --swing-y: -100;
            --swing-x: 100;
        }
    }
`;
