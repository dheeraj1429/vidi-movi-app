import styled from "styled-components";

export const div = styled.div`
    position: relative;
    p {
        color: var(--main-cl);
    }
`;

export const spaceDiv = styled.div`
    width: 100%;
    padding: 2rem 0;
`;

export const innerDiv = styled.div`
    width: 100%;
    padding: 1rem;
    position: relative;
`;

export const spnenrDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
