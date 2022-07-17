import styled from "styled-components";

export const list = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
        fill: var(--smooht-gray-cl);
        font-size: 18px;
    }

    p {
        margin-bottom: 0;
        margin-left: 1rem;
        font-weight: 500;
        font-size: 15px;
        color: var(--smooht-gray-cl);
    }

    &:hover {
        background-color: var(--spec-menu-background);
    }
`;
