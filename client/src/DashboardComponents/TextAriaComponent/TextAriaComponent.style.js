import styled from "styled-components";

export const div = styled.div`
    position: relative;
`;

export const label = styled.label`
    font-size: 17px;
    position: absolute;
    top: 10px;
    left: 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #555555;
`;

export const text = styled.textarea`
    width: 100%;
    height: 400px;
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    border-color: var(--spec-text-secondary);
    border-radius: 6px 6px 6px 6px;
    color: #555555;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 1em;
    line-height: 1.4em;
    padding: 0.5rem;
    transition: background-color 0.2s ease 0s;
    outline: none;
    :focus .textaria-lable {
        top: 0;
        left: 0;
    }
`;
