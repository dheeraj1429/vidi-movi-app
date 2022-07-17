import styled from "styled-components";

export const div = styled.div`
    position: relative;
    background-color: var(--spec-elevated-background);
    width: 100%;
    height: 100vh;
`;

export const flexDiv = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const sidebar = styled.div`
    width: 20%;
    height: 100%;
    background-color: var(--body-background-cl);
    /* padding: 1rem 0; */
`;

export const options = styled.div`
    width: 80%;
    padding: 1rem;
    overflow-x: hidden;
`;
