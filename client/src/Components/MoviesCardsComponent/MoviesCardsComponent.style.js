import styled from "styled-components";

export const div = styled.div`
    width: 400px;
    height: auto;
    h3 {
        color: var(--main-cl);
        font-size: 14px;
        margin-top: 0.5rem;
        font-weight: 400;
    }
`;

export const cartContentDiv = styled.div`
    transition: all 0.3s ease;
    position: relative;
    &:hover {
        transform: scale(1);
    }
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
    height: 300px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    transition: all 0.3s ease;
    z-index: 10;
    overflow: hidden;

    &:hover .play-div {
        visibility: visible;
    }

    &:hover .movi-information-div {
        bottom: 0px;
    }
`;

export const playDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
    cursor: pointer;
    svg {
        color: var(--main-cl);
        font-size: 30px;
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
