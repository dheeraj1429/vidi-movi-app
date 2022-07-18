import styled from "styled-components";

export const div = styled.div`
    padding: 2rem 1rem;
    text-align: center;
    background-color: ${(props) => (props.edit ? null : "var(--overlay-cl)")};
`;

export const profile = styled.div`
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    /* border: 1px solid red; */
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        margin: 0;
        color: var(--main-cl);
    }
    svg {
        fill: var(--main-cl);
        cursor: pointer;
    }

    input {
        display: none;
    }
`;

export const profileContnet = styled.div`
    padding-top: 1.4rem;
    p {
        color: var(--spec-elevated-background-inverse);
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: 200;
        margin-bottom: 0.3rem;
        color: ${(props) => (props.edit ? "var(--dark-cl)" : "var(--main-cl)")};
    }

    h1 {
        color: ${(props) => (props.edit ? "var(--spec-icon-disabled)" : "var(--main-cl)")};
        font-size: 30px;
    }
`;
