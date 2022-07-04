import styled from "styled-components";

export const div = styled.div`
    padding: 0.6rem;
    display: flex;
    align-items: center;
`;

export const userProfile = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        margin: 0;
        color: var(--main-cl);
    }
`;

export const arrowDiv = styled.div`
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;

    border-right: 5px solid var(--main-cl);
`;

export const userMessage = styled.div`
    width: calc(20% + 200px);
    padding: 0.2rem 1.4rem;
    /* background-color: var(--main-cl); */
    border-bottom: 1px solid var(--spec-elevated-background);
    border-top: 1px solid var(--spec-elevated-background);
    border-radius: 6px;
    position: relative;
    /* float: ${(props) => (props.isUser ? "right" : "left")}; */
    color: var(--main-cl);

    p {
        font-size: 11px;
        width: 80%;
        margin: 0;
    }

    span {
        font-size: 10px;
        position: absolute;
        right: 9px;
        bottom: 4px;
    }
`;

export const user = styled.div`
    p {
        font-size: 10px;
        font-weight: 600;
    }
`;
