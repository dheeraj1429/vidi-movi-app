import styled from "styled-components";

export const mainDiv = styled.div`
    .showPupUp_div {
        opacity: 1;
        transform: scale(1);
        visibility: visible;
    }
`;

export const div = styled.div`
    position: absolute;
    top: 30px;
    right: -20px;
    width: 380px;
    /* height: 400px; */
    background-color: var(--gray-cl);
    border: 1px solid var(--light-gray);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.7);
`;

export const innerDiv = styled.div`
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
        color: var(--main-cl);
        margin-bottom: 0;
        font-weight: 400;
        font-size: 13px;
    }

    .notification_div {
        padding: 0.2rem 1.2rem;
        background-color: var(--color-red);
        border-radius: 50px;
        font-size: 14px;
        color: var(--main-cl);
        transform: scale(0.7);
    }
`;

export const overFlowDiv = styled.div`
    width: 100%;
    height: 400px;
    overflow-x: hidden;
    background-color: var(--overlay-cl);
`;

export const settingDiv = styled.div`
    width: 100%;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h4 {
        color: var(--main-cl);
        margin-bottom: 0;
        font-weight: 400;
        font-size: 13px;
    }

    svg {
        color: var(--main-cl);
    }
`;
