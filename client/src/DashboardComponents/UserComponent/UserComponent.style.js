import styled from "styled-components";

export const div = styled.div`
    margin-top: 2rem;
`;

export const authentication = styled.div`
    padding: 2rem;
    width: 80%;
    margin: auto;
    margin-top: 2rem;
    border-radius: 10px;
    background-color: var(--main-cl);
    box-shadow: 2px 1px 36px 0px rgba(161, 161, 161, 0.75);
    -webkit-box-shadow: 2px 1px 36px 0px rgba(161, 161, 161, 0.75);
    -moz-box-shadow: 2px 1px 36px 0px rgba(161, 161, 161, 0.75);

    .heading-div {
        border-bottom: 1px solid var(--progress-cl);
        margin-bottom: 1rem;
    }

    p {
        font-size: 17px;
    }
`;
