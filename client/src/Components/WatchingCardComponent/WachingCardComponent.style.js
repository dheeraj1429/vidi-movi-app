import styled from "styled-components";

export const coverDiv = styled.div`
    padding: 0 0.5rem;
`;

export const innerDiv = styled.div`
    width: 100%;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    position: relative;
`;

export const moveImageDiv = styled.div`
    width: 30%;
    height: 100px;
    background-position: center;
    background-size: cover;
    position: relative;

    &:hover .icons_holder {
        visibility: visible;
        opacity: 1;
    }
`;

export const watchTimeLineDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--heading-cl);
    bottom: 0;
    left: 0;
    border-radius: 30px;
`;

export const watchTimer = styled.div`
    height: 100%;
    transition: all 0.5s ease;
    background-color: var(--color-red);
`;

export const movieContentDiv = styled.div`
    padding: 0 1rem;
    width: 80%;
    h5 {
        color: var(--main-cl);
        margin: 0;
        font-size: 18px;
    }
    p {
        margin: 0.3rem 0;
        color: var(--main-cl);
    }
    span {
        color: var(--progress-cl);
        font-size: 13px;
    }
`;
