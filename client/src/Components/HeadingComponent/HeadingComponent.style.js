import styled from "styled-components";

export const Popular = styled.div`
    padding-top: 0.7rem;
    border-bottom: 1px solid var(--progress-cl);
    h1 {
        color: var(--main-cl);
        font-size: 19px;
        font-family: Paralucent-light;
        letter-spacing: 1.3px;
        margin: 0;
        font-weight: 700;
    }
`;

export const innerDiv = styled.div`
    padding: 0.5rem 0;
    border: 1px solid red;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(7% 0, 100% 0%, 93% 100%, 0% 100%);
    background-color: var(--color-red);
`;
