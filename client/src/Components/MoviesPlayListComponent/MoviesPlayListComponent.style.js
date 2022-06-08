import styled from "styled-components";

export const div = styled.div`
    position: relative;
`;

export const marginDiv = styled.div`
    margin-top: -150px;
    position: relative;
`;

export const flexDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    div {
        padding: 0.5rem;
    }
`;
