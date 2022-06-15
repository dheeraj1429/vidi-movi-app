import styled from "styled-components";

export const div = styled.div`
    svg {
        fill: var(--main-cl);
        font-size: 24px;
        cursor: pointer;
    }

    .active_search_bar {
        overflow: visible;
    }
`;

export const flexDiv = styled.div`
    display: flex;
    align-items: center;
`;

export const searchBarDiv = styled.div`
    position: relative;
    width: 600px;
    height: 30px;
    border-radius: 50px;
    margin-left: 1rem;
    transition: all 0.3s ease;
    overflow: hidden;

    input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 0 1rem;
        outline: none;
        background-color: var(--smooht-gray-spec-cl);
    }

    @media (max-width: 1400px) {
        width: 500px;
    }
    @media (max-width: 1000px) {
        width: 300px;
    }
    @media (max-width: 700px) {
        width: 300px;
    }
`;

export const searchCard = styled.div`
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: 300px;
    border-radius: 0 0px 10px 10px;
    overflow-x: hidden;
    background-color: var(--main-cl);

    svg {
        font-size: 15px;
        fill: var(--dark-cl);
    }
`;
