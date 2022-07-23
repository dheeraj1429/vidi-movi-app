import styled from "styled-components";

export const div = styled.div`
    position: relative;
    width: 100%;
    padding: 250px 40px;
    background-position: top;
    background-size: cover;
    transition: all 0.3s ease;
`;

export const innerDiv = styled.div``;

export const headingDiv = styled.div`
    h1 {
        color: var(--heading-cl);
        font-family: Paralucent-bold;
        font-size: 180px;
    }
    .line_div {
        width: 200px;
        height: 5px;
        margin-top: -120px;
        background-color: var(--button-cl);
        border-radius: 30px;
    }
`;
