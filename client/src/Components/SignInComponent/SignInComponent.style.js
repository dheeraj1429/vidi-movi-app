import styled from "styled-components";

export const div = styled.div`
    width: 500px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    padding: 60px 68px 40px;
`;

export const SignInWithGoogleDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    button {
        width: 100%;
        justify-content: center;
    }
`;

export const loginDiv = styled.div`
    .login__title {
        margin-bottom: 1.5rem;
        font-size: 2.2rem;
        font-weight: 600;
        color: #fff;
    }
    .error-message {
        color: var(--button-cl);
        margin-bottom: 1rem;
    }
`;

export const loginGroup = styled.div`
    position: relative;
    z-index: 10;
    p {
        color: var(--button-cl);
    }
`;

export const options = styled.div`
    text-align: center;
    padding-top: 1rem;
    a {
        text-decoration: none;
    }
    p {
        color: var(--main-cl);
        font-size: 12px;
        margin-bottom: 0.5rem;
    }
    span {
        color: var(--google-button-cl);
        cursor: pointer;
    }
`;
