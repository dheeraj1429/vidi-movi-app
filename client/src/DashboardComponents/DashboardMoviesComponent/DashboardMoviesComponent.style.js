import styled from "styled-components";

export const div = styled.div``;

export const innderDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    padding: 1rem;

    @media (max-width: 1500px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 1000px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
