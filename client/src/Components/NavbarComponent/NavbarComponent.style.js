import styled from "styled-components";

export const div = styled.div`
    width: 100%;
    display: flex;
    position: fixed;
`;

export const innerDiv = styled.div`
    width: 100%;
    padding: 1rem;
`;

export const imageDiv = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    padding: 1rem;
    img {
        width: auto;
        height: 60px;
        margin-left: 1rem;
    }
`;

export const list = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const IconDiv = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
