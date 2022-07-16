import styled from "styled-components";

export const mainDiv = styled.div`
    .ShowMovieSidebar {
        right: 0;
    }

    h3 {
        color: var(--main-cl);
        font-size: 18px;
        font-weight: 400;
    }
`;

export const div = styled.div`
    position: fixed;
    width: 500px;
    height: 96vh;
    -webkit-backdrop-filter: blur(8px); /* Safari 9+ */
    backdrop-filter: blur(8px); /* Chrome and Opera */
    box-shadow: 0px 10px 15px 10px rgb(0 0 0 / 15%);
    background-color: rgb(228 228 228 / 15%);
    position: absolute;
    top: 0;
    right: -550px;
    transition: all 0.7s ease;
    overflow-x: hidden;
    padding: 1rem;
    z-index: 100;

    div {
        padding: 0.5rem;
    }
`;
