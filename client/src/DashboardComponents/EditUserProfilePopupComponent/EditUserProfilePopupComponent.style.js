import styled from "styled-components";

export const div = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--overlay-cl);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 20px;
        margin-bottom: 2rem;
    }
`;

export const innerDiv = styled.div`
    width: 500px;
    height: auto;
    padding: 1rem 2rem;
    background-color: var(--heading-cl);
    border-radius: 10px;
    position: relative;

    .close_icons_elm {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
        margin-bottom: 1rem;
    }
`;

export const flexDiv = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 1rem;
`;
