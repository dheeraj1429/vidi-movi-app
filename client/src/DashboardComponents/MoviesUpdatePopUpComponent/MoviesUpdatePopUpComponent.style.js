import styled from "styled-components";

export const div = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--edit-popup-onerlay-color);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const innerDiv = styled.div`
    width: 80%;
    height: 90%;
    border-radius: 10px;
    background-color: var(--main-cl);
    position: absolute;
    padding: 1rem;
`;

export const closeIcon = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
`;
