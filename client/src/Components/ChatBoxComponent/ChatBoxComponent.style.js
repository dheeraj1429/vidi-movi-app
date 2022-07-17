import styled from "styled-components";

export const div = styled.div`
    padding: 1rem 0;
    width: 100%;
`;

export const innerDiv = styled.div`
    width: 100%;
    border: 1px solid var(--spec-elevated-background);
    border-radius: 10px;
    background-image: linear-gradient(to top, #000000, #060606, #0b0b0b, #101010, #141414);
    h1 {
        color: var(--smooht-gray-cl);
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 1.2px;
    }

    svg {
        fill: var(--spec-icon-inactive);
        cursor: pointer;
        font-size: 20px;
    }
`;

export const chatHeading = styled.div`
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--spec-elevated-background);
`;

export const flexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const chatScreen = styled.div`
    width: 100%;
    height: 500px;
    overflow-x: hidden;
    padding: 1rem;
`;
