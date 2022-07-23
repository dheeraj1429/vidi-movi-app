import styled from "styled-components";

export const chatBottomConterollDiv = styled.div`
    width: 100%;
    /* border-top: 1px solid var(--spec-elevated-background); */
    padding: 1rem 0;
    position: relative;

    svg {
        fill: var(--main-cl);
        cursor: pointer;
    }

    @media (max-width: 1200px) {
        .emoji-picker-react {
            left: 0 !important;
        }
    }
    @media (max-width: 500px) {
        .emoji-picker-react {
            width: 220px;
            top: -400px !important;
        }
    }
`;

export const chatInputBox = styled.div`
    width: 100%;
    display: flex;
    border-radius: 30px;
    border: 1px solid var(--spec-elevated-background);
    align-items: center;

    .ant-spin-spinning {
        transform: scale(0.8);
        margin-right: 1rem;
    }

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
