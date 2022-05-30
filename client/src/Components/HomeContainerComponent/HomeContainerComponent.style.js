import styled from "styled-components";

export const div = styled.div`
    position: relative;
`;

export const moviesShowDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    transition: all 0.3s ease;

    @media (max-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 850px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 700px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
