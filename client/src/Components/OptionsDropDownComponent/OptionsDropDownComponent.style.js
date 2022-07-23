import styled from "styled-components";

export const div = styled.div`
    position: absolute;
    top: 30px;
    right: -40px;
    z-index: 400;
    width: 300px;
    text-align: center;
    margin: 32px;
    background: var(--dark-cl);
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    .name {
        color: var(--main-cl);
    }
    .title {
        color: var(--spec-call-to-action);
        font-size: 14px;
        padding: 8px;
    }
    .description {
        font-size: 18px;
        font-weight: 300;
        padding: 10px 22px;
    }
`;

export const picDiv = styled.div`
    width: 110px;
    height: 110px;
    border-radius: 100%;
    margin: 10px auto 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    .pic {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        margin: auto;
        position: relative;
        top: 5px;
        box-shadow: 0 13px 26px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.2);
    }
    svg {
        transform: scale(1.4);
    }
`;

export const innerDiv = styled.div`
    border-top: 1px solid var(--smooht-gray-cl);
    a {
        width: 100%;
    }
`;
