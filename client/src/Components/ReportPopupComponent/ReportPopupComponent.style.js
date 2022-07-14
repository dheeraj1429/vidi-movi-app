import styled from "styled-components";

export const div = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--overlay-cl);
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 100;
`;

export const innerDiv = styled.div`
    width: 500px;
    height: auto;
    padding: 2rem;
    border-radius: 10px;
    background-color: var(--main-cl);
    position: relative;

    h5 {
        font-size: 25px;
    }

    p {
        /* margin-bottom: 1rem; */
        font-size: 15px;
    }

    .report_message {
        margin-top: 1rem;
        margin-bottom: 0;
    }

    .close_icon {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        font-size: 20px;
    }
`;

export const mr = styled.div`
    margin-bottom: 0.7rem;
`;
