import styled from "styled-components";

export const playDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: hidden;
    cursor: pointer;
    width: 0px;
    height: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
    opacity: 0;

    svg {
        color: var(--main-cl);
        font-size: 30px;
    }
`;
