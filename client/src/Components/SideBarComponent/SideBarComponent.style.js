import styled from "styled-components";

export const mainDiv = styled.div`
    width: 250px;
    background-color: var(--dark-cl);
    overflow-x: hidden;
    position: relative;
    @media (max-width: 1000px) {
        width: 200px;
    }
    @media (max-width: 600px) {
        width: 100px;
    }
`;

export const innerDiv = styled.div`
    padding: 0.5rem 0;
    position: absolute;
    left: 0;
    width: 100%;
`;
