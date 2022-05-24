import styled from "styled-components";

export const div = styled.div`
    width: 100%;
    display: flex;
    background-color: var(--dark-cl);
    padding: 0.5rem 1rem;
    .user-login-div {
        display: flex;
        align-items: center;
    }
    .user-login-div p {
        color: var(--main-cl);
        font-size: 14px;
        margin-left: 1rem;
    }
    @media (max-width: 1000px) {
        .navbar-search-div {
            width: 80%;
        }
    }
    @media (max-width: 400px) {
        .navbar-search-div {
            width: 50%;
        }
    }
`;

export const innerDiv = styled.div`
    width: 100%;
    padding: 1rem;
`;

export const imageDiv = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding: 1rem;
    img {
        width: auto;
        height: 60px;
        margin-left: 1rem;
    }
    svg {
        color: var(--main-cl);
        cursor: pointer;
        font-size: 20px;
    }
    @media (max-width: 1000px) {
        width: 60%;
    }
    @media (max-width: 600px) {
        width: auto;
    }
`;

export const list = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const IconDiv = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 1000px) {
        width: 80%;
    }
    @media (max-width: 800px) {
        width: 100%;
    }
`;
