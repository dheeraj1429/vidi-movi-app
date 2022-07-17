import styled from "styled-components";

export const div = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 8px;
    margin-right: 1rem;
    position: relative;
    border: 1px dashed var(--smooht-gray-cl);
    overflow: hidden;
    padding: 1rem;
    p {
        font-size: 12px;
    }
`;

export const flexDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    p {
        font-size: 10px;
    }
`;

export const uploadDiv = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0.5rem 0.2rem;
    border-radius: 0px 0px 6px 6px;
    top: 0;
    left: 0;
    z-index: 99;
    input {
        opacity: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
    }
    i {
        font-size: 15px;
        color: var(--sm_gray);
    }
    p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        color: var(--mainColor);
        z-index: 1;
    }
`;
