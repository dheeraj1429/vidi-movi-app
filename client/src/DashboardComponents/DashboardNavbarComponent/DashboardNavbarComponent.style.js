import styled from "styled-components";

export const header = styled.div`
    padding: 1rem 0;
    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
`;

export const action = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5rem;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    button:first-child {
        transform: rotate(0);
        transition: transform 0.2s ease-in-out;
    }
    button:first-child:hover {
        transform: rotate(180deg);
    }
    button:nth-child(2):hover {
        transform-origin: 50% 2px;
    }

    .avatar {
        height: 40px;
        width: 40px;
        overflow: hidden;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--light-gray);
    }

    .main {
        width: min(100% - 2rem, 60rem);
        margin-inline: auto;
    }
    .main figure {
        position: relative;
    }
    .main figure img {
        border-radius: 10px;
    }
    .main figcaption {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 5rem;
        font-weight: bold;
        background-color: rgba(14, 11, 35, 0.4);
    }
`;

export const headerInner = styled.div`
    width: 100%;
    margin-inline: auto;
    align-content: center;
    display: flex;
    justify-content: space-between;
`;
