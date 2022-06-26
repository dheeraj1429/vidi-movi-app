import styled from "styled-components";

export const div = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    overflow: hidden;
`;

export const innerDiv = styled.div`
    width: 15%;
    height: 100%;
    transition: all 0.3s ease;
    background-color: var(--button-cl);
`;
