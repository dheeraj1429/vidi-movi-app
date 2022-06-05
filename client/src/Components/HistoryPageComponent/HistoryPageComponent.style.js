import styled from "styled-components";

export const div = styled.div`
    p {
        color: var(--main-cl);
    }
`;

export const h1 = styled.h1`
    color: var(--main-cl);
`;

export const spnenrDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const filterDiv = styled.div`
    display: flex;
`;

export const moviesShowDiv = styled.div`
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    transition: all 0.3s ease;
    position: relative;

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
