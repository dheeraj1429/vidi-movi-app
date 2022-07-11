import styled from "styled-components";

export const div = styled.div`
    width: 100%;
    padding: 0.5rem 0;

    svg {
        fill: var(--main-cl);
        margin-right: 1.5rem;
        cursor: pointer;
        font-size: 18px;
    }
`;

export const mr = styled.div`
    margin: 1rem 0;
`;

export const flexDiv = styled.div`
    display: flex;
`;

export const widthDiv = styled.div`
    /* width: 40px; */
`;

export const userImage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        margin: 0;
        font-size: 23px;
        color: var(--main-cl);
    }
`;

export const commentDiv = styled.div`
    margin-left: 1rem;

    h5 {
        font-size: 13px;
        margin-bottom: 0;
        color: var(--main-cl);
    }

    p {
        color: var(--smooht-gray-cl);
        margin-bottom: 0;
        font-size: 12px;
        font-weight: 200;
    }

    span {
        margin: 0;
        color: var(--smooht-gray-cl);
        font-size: 10px;
    }
`;
