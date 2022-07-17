import styled from "styled-components";

export const div = styled.div``;

export const menu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-secondary);
    border-radius: 10px;
    box-shadow: -2px 6px 25px -8px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: -2px 6px 25px -8px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -2px 6px 25px -8px rgba(0, 0, 0, 0.75);
    width: 300px;

    ul li {
        list-style: none;
    }
    .menu-list {
        margin: 0;
        display: block;
        width: 100%;
        padding: 8px;
    }
    .menu-list + .menu-list {
        border-top: 1px solid #ddd;
    }

    .menu-sub-list {
        display: none;
        padding: 8px;
        background-color: var(--color-bg-secondary);
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(64, 64, 64, 0.15);
        position: absolute;
        left: 100%;
        right: 0;
        z-index: 100;
        width: 100%;
        top: 0;
        flex-direction: column;
    }
    .menu-sub-list:hover {
        display: flex;
    }
`;
