import styled from "styled-components";

export const header = styled.div`
    background-color: var(--main-cl);
    padding-right: 1rem;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    svg {
        /* color: var(--main-cl); */
        cursor: pointer;
    }
`;

export const logoDiv = styled.div`
    width: 242px;
    background-color: var(--dark-cl);
    padding: 1rem 2rem;
    margin-right: 1rem;
`;

export const serchDiv = styled.div`
    font-size: 15px;
`;

export const action = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.5rem;

    svg {
        font-size: 18px;
    }

    .avatar {
        height: 30px;
        width: 30px;
        overflow: hidden;
        border-radius: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const headerInner = styled.div`
    width: 100%;
    margin-inline: auto;
    align-content: center;
    display: flex;
    align-items: center;
`;

export const flexDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const iconsDiv = styled.div`
    position: relative;
`;

export const profileDiv = styled.div`
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #757575;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    position: relative;
    svg {
        transform: scale(1.4);
    }
`;
