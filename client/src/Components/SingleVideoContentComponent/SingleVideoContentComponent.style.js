import styled from "styled-components";

export const mainDiv = styled.div``;

export const div = styled.div`
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--button-cl);

    h5 {
        color: var(--main-cl);
        font-weight: 400;
        font-size: 50px;
        margin-top: 1rem;
        font-family: Paralucent-bold;
        letter-spacing: 3px;
        margin-bottom: 1rem;
    }

    p {
        font-size: 12px;
        color: var(--progress-cl);
        margin-top: 0.3rem;
        line-height: 20px;
    }

    @media (max-width: 1300px) {
        h5 {
            font-size: 30px;
        }
    }

    @media (max-width: 500px) {
        h5 {
            font-size: 20px;
        }

        p {
            font-size: 11px;
        }
    }
`;

export const iconDiv = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    p {
        margin: 0;
        margin-left: 0.8rem;
    }
`;
