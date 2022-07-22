import styled from "styled-components";

export const parentDiv = styled.div`
    .active-bar {
        border-left: 2px solid var(--light-active-spec-cl);
    }
    .active-bar p {
        color: var(--light-active-spec-cl);
    }
    .active-bar svg {
        fill: var(--light-active-spec-cl);
    }
    .dashboard_active_bar {
        background-color: var(--google-button-cl);
        border-radius: 10px;
    }

    .dashboard_active_bar p {
        color: var(--main-cl);
    }
    .dashboard_active_bar svg {
        fill: var(--main-cl);
    }

    .inner_section {
        background-color: transparent !important;
    }
`;

export const div = styled.div`
    position: relative;
    .showInenrOptions {
        visibility: visible;
        transform: scale(1);
        opacity: 1;
    }
`;

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
        margin-bottom: 0;
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

export const sideBarInnerOptionsDiv = styled.div`
    position: absolute;
    width: 200px;
    top: 0;
    left: -200px;
    background: var(--dark-cl);
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    visibility: hidden;
    transition: all 0.3s ease;
    transform: scale(0.6);
    opacity: 0;
    ul {
        padding-left: 0;
    }
    ul li {
        list-style: none;
    }
`;
