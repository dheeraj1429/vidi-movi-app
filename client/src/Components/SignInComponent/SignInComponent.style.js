import styled from "styled-components";

export const div = styled.div`
    width: 500px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    padding: 60px 68px 40px;
`;

export const loginDiv = styled.div`
    .login__title {
        margin-bottom: 1.5rem;
        font-size: 2.2rem;
        font-weight: 600;
        color: #fff;
    }
    p {
        color: var(--button-cl);
        margin-bottom: 1rem;
    }
`;

export const loginGroup = styled.div`
    position: relative;
    z-index: 10;
`;
