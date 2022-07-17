import styled from "styled-components";

export const moviesSearch = styled.div`
    width: 100%;
    margin-bottom: 1.5rem;

    input {
        border: none;
        outline: none;
        border-bottom: 1px solid var(--main-cl);
        padding: 0.5rem;
        color: var(--main-cl);
        background-color: transparent;
    }

    svg {
        fill: var(--main-cl);
        cursor: pointer;
    }
`;
