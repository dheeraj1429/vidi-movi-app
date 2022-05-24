import styled from "styled-components";

export const div = styled.div``;

export const formGroup = styled.div`
    padding: 1rem;
    margin-top: 1rem;
    box-shadow: 0px 0px 4px 2px var(--smooht-gray-cl);
    border-radius: 10px;
    #movie-descriptions {
        width: 100%;
    }
    .margin-bottom {
        padding: 0;
        margin-bottom: 1rem;
    }
    .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
        width: 100%;
    }
`;

export const innerDiv = styled.div`
    padding: 1rem 0;
    display: flex;
    .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
        width: 100%;
        padding-right: 0.5rem;
    }
    @media (max-width: 800px) {
        display: grid;

        .css-1u3bzj6-MuiFormControl-root-MuiTextField-root {
            margin-bottom: 1.4rem;
        }
    }
`;

export const endDiv = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    p {
        margin-right: 1rem;
        font-size: 13px;
    }
`;
