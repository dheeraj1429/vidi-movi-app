import styled from "styled-components";

export const div = styled.div`
    padding: ${(props) => (props.edit ? null : "2rem 1rem;")};
    text-align: ${(props) => (props.edit ? "start" : "center")};
    background-color: ${(props) => (props.edit ? null : "var(--overlay-cl)")};
    display: ${(props) => (props.edit ? "flex" : "block")};
    margin-top: ${(props) => (props.edit ? "-116px" : null)};
    position: relative;
`;

export const profile = styled.div`
    width: ${(props) => (props.edit ? "130px" : "100px")};
    height: ${(props) => (props.edit ? "130px" : "100px")};
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    /* border: 1px solid red; */
    margin: ${(props) => (props.edit ? null : "auto")};
    margin-right: ${(props) => (props.edit ? "2rem" : null)};
    display: flex;
    align-items: center;
    justify-content: center;
    p {
        margin: 0;
        color: var(--main-cl);
    }
    svg {
        fill: var(--main-cl);
        cursor: pointer;
    }

    input {
        display: none;
    }
`;

export const profileContnet = styled.div`
    padding-top: 1.4rem;
    p {
        color: var(--spec-elevated-background-inverse);
        letter-spacing: 1px;
        font-weight: 200;
        margin-bottom: 0.3rem;
        color: var(--main-cl);
        font-size: ${(props) => (props.edit ? "20px" : "12px")};
    }

    h1 {
        color: ${(props) => (props.edit ? "var(--spec-icon-disabled)" : "var(--main-cl)")};
        font-size: ${(props) => (props.edit ? "60px" : "30px")};
        font-family: "Paralucent-meduim";
    }
`;
