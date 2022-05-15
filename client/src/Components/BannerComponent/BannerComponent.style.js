import styled from "styled-components";

export const bannerDiv = styled.div`
    height: 100vh;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
`;

export const contentDiv = styled.div`
    h5 {
        color: var(--main-cl);
        margin: 0;
        font-weight: 500;
        font-size: 15px;
    }

    h1 {
        color: var(--main-cl);
        font-size: 100px;
        margin: 0;
    }

    p {
        color: var(--main-cl);
        max-width: 900px;
        font-size: 14px;
    }
`;

export const contentFlex = styled.div`
    display: flex;
    p {
        color: var(--main-cl);
        margin: 0;
        margin-right: 1rem;
    }
    .activeBr {
        color: var(--button-cl);
    }
`;
