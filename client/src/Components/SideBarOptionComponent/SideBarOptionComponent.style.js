import styled from "styled-components";

export const div = styled.div``;

export const innerDiv = styled.div`
    display: flex;
    align-items: center;
    padding: 0.8rem 0;
    padding-left: 1.6rem;
    transition: all 0.1s ease;
    cursor: pointer;
    svg {
        color: var(--smooht-gray-cl);
        font-size: 20px;
    }
    p {
        color: var(--smooht-gray-cl);
        font-size: 14px;
    }
    &:hover {
        background-color: var(--light-gray);
    }
    @media (max-width: 1000px) {
        p {
            font-size: 12px;
        }
    }
    @media (max-width: 600px) {
        p {
            display: none;
        }
    }
`;

export const svgDiv = styled.div`
    width: 50px;
    height: auto;
    display: flex;
    align-items: center;
    @media (max-width: 1000px) {
        width: 30px;
    }
    @media (max-width: 600px) {
        width: auto;
    }
`;
