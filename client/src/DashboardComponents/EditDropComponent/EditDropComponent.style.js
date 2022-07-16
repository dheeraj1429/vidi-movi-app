import styled from "styled-components";

export const li = styled.li`
    list-style: none;
    .menu-button {
        font: inherit;
        border: 0;
        padding: 8px 8px;
        padding-right: 36px;
        width: 100%;
        border-radius: 8px;
        text-align: left;
        display: flex;
        align-items: center;
        position: relative;
        background-color: var(--color-bg-secondary);
        position: relative;
    }

    .menu-button:hover {
        background-color: var(--color-bg-primary-offset);
    }
    .menu-button:hover + .menu-sub-list {
        display: flex;
    }
    .menu-button:hover svg {
        stroke: var(--color-text-primary);
    }
    .menu-button svg {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        stroke: var(--color-text-primary-offset);
    }
    .menu-button svg:nth-of-type(2) {
        margin-right: 0;
        position: absolute;
        right: 8px;
    }
    .menu-button--delete:hover {
        color: var(--color-red);
    }
    .menu-button--delete:hover svg:first-of-type {
        stroke: var(--color-red);
    }
    .menu-button--orange svg:first-of-type {
        stroke: var(--color-orange);
    }
    .menu-button--green svg:first-of-type {
        stroke: var(--color-green);
    }
    .menu-button--purple svg:first-of-type {
        stroke: var(--color-purple);
    }
    .menu-button--black svg:first-of-type {
        stroke: var(--color-black);
    }
    .menu-button--checked svg:nth-of-type(2) {
        stroke: var(--color-purple);
    }
`;
