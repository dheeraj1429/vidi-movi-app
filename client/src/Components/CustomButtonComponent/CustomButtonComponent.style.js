import styled from "styled-components";

export const div = styled.div`
    .banner-button {
        margin-top: 1rem;
        padding: 0.8rem 2rem;
    }
    .login__sign-in {
        width: 100%;
        padding: 16px;
        color: #fff;
        background: var(--button-cl);
        font-size: 0.9rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 1rem;
    }
    .google__sign-in {
        margin-top: 2rem;
        width: 100%;
        padding: 1rem;
        background-color: var(--google-button-cl);
    }
`;

export const button = styled.button`
    padding: 0.5rem 2rem;
    cursor: pointer;
    background-color: var(--button-cl);
    border-radius: 5px;
    color: var(--main-cl);
    border: none;
`;
