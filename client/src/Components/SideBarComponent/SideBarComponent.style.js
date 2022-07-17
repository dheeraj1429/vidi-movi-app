import styled from "styled-components";

export const div = styled.div`
    background-color: var(--dark-cl);

    .small_sideBar {
        width: 80px;
    }

    .small_sideBar p {
        display: none;
    }
`;

export const mainDiv = styled.div`
    width: 270px;
    background-color: var(--dark-cl);
    overflow-x: hidden;
    position: relative;
    padding: 1rem 0;
    transition: all 0.3s ease;

    @media (max-width: 1000px) {
        width: 200px;
    }

    @media (max-width: 600px) {
        width: 100px;
    }
`;

export const barsDiv = styled.div`
    padding: 0.5rem 1.7rem;

    svg {
        fill: var(--main-cl);
        cursor: pointer;
        font-size: 20px;
    }
`;

export const innerDiv = styled.div`
    padding: 0.5rem 0;
    /* position: absolute; */
    left: 0;
    width: 100%;
    z-index: 100;
`;
