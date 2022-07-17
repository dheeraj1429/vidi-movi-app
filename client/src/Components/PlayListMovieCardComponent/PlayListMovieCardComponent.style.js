import styled from "styled-components";

export const movieCard = styled.div`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    align-items: flex-end;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &:hover .hoverBanner_div {
        transform: scale(1.1);
    }

    .hoverBanner_div {
        background-position: center;
        transition: all 0.3s ease;
        background-size: cover;
        background-image: url("images/bg-1.png");
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }

    h5 {
        color: var(--heading-cl);
        font-weight: 400;
        position: relative;
        font-size: 18px;
    }
`;
