import styled from "styled-components";

export const searchCardInnerDiv = styled.div`
    width: 100%;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;

    svg {
        fill: var(--dark-cl);
        font-size: 15px;
        margin-right: 1rem;
    }

    p {
        margin: 0;
        color: var(--dark-cl) !important;
    }

    &:hover {
        background-color: var(--light-gray);
    }

    &:hover p {
        color: var(--main-cl) !important;
    }

    &:hover svg {
        fill: var(--main-cl);
    }
`;
