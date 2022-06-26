import styled from "styled-components";

export const chatBottomConterollDiv = styled.div`
    width: 100%;
    border-top: 1px solid var(--spec-elevated-background);
    padding: 1rem 2rem;
`;

export const chatInputBox = styled.div`
    width: 100%;
    display: flex;
    border-radius: 30px;
    border: 1px solid var(--spec-elevated-background);
    align-items: center;

    input {
        width: 100%;
        height: 40px;
        border: none;
        background-color: transparent;
        padding: 1rem;
        outline: none;
        color: var(--main-cl);
    }

    svg {
        width: 10%;
    }
`;
