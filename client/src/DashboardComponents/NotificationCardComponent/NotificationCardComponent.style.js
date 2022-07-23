import styled from "styled-components";

export const innerCardDiv = styled.div`
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: var(--dark-cl);
    }

    .message_icon_div {
        width: 40px;
    }

    p {
        color: var(--main-cl);
        margin-bottom: 0;
    }
    span {
        color: var(--spec-text-disabled);
        font-size: 12px;
    }
`;
