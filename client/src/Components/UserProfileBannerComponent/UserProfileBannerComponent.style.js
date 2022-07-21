import styled from "styled-components";

export const div = styled.div``;

export const profileBanner = styled.div`
    width: 100%;
    height: 300px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 60px 0 0 0;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    justify-content: end;
    padding: 2rem;

    &:before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(2, 0, 36);
        background: linear-gradient(
            0deg,
            rgba(2, 0, 36, 1) 0%,
            rgba(0, 0, 0, 0.7483368347338936) 0%,
            rgba(255, 255, 255, 0) 100%
        );
    }

    input {
        display: none;
    }
`;

export const innerDiv = styled.div`
    position: absolute;
    right: 40px;
    bottom: 30px;
    display: flex;
    align-items: center;
    z-index: 200;

    svg {
        fill: var(--main-cl);
        cursor: pointer;
        transform: scale(2);
        margin-left: 2rem;
        transition: all 0.2s ease;

        &:hover {
            transform: scale(2.1);
        }
    }

    .button_div {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .showButtonDiv {
        visibility: visible;
        opacity: 1;
    }
`;
