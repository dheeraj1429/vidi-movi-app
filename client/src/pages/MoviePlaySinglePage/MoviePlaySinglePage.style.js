import styled from "styled-components";

export const div = styled.div`
    width: 100%;
    height: auto;
`;

export const flexDiv = styled.div`
    display: flex;

    @media (max-width: 1200px) {
        display: block;
    }
`;

export const moviDiv = styled.div`
    width: 70%;
    height: 530px;

    @media (max-width: 1700px) {
        height: auto;
    }

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

export const contentDiv = styled.div`
    width: 30%;
    padding: 1rem;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;
