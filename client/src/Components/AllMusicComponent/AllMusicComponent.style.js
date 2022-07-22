import styled from "styled-components";

export const div = styled.div``;

export const flexDiv = styled.div`
    display: flex;
    justify-content: space-between;

    h1 {
        font-size: 70px;
        color: var(--main-cl);
        margin: 0;
    }

    p {
        color: var(--spec-error-background);
        font-size: 18px;
        margin-top: 1rem;
    }

    svg {
        fill: var(--main-cl);
        cursor: pointer;
        font-size: 30px;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.1);
        }
    }
`;

export const moviShow = styled.div`
    width: 100%;
    .slick-list {
        padding: 1rem 0;
    }
`;
