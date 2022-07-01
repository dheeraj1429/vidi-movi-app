import styled from "styled-components";

export const div = styled.div`
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--button-cl);

    h2 {
        color: var(--main-cl);
        font-family: "Paralucent-bold";
        font-size: 40px;
        letter-spacing: 3px;
    }

    p {
        color: var(--spec-icon-inactive);
        font-size: 13px;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }

    span {
        color: var(--spec-icon-inactive);
        font-size: 13px;
        margin-right: 0.5rem;
    }

    svg {
        fill: var(--main-cl);
        margin-right: 0.5rem;
    }

    @media (max-width: 1000px) {
        h2 {
            font-size: 22px;
            font-weight: 400;
        }
    }

    @media (max-width: 600px) {
        h2 {
            font-size: 17px;
        }
    }
`;

export const flexDiv = styled.div`
    display: flex;
    align-items: center;
`;

export const tag = styled.div`
    width: 100px;
`;
