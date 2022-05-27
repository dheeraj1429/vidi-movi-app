import styled from "styled-components";

export const div = styled.div``;

export const bannerImage = styled.div`
    width: 100%;
    height: 700px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    position: relative;
    margin-bottom: 1rem;
    -webkit-box-reflect: below 5px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
    -webkit-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    @media (max-width: 1000px) {
        height: 400px;
    }
    @media (max-width: 600px) {
        height: auto;
        padding: 1rem;
    }
`;

export const flexDiv = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const contentDiv = styled.div`
    h5 {
        color: var(--heading-cl);
        margin-bottom: 3rem;
        font-size: 25px;
        font-family: Paralucent-bold;
    }
    h4 {
        color: var(--heading-cl);
        font-size: 20px;
        font-family: Paralucent-bold;
    }
    h1 {
        color: var(--heading-cl);
        font-size: 140px;
        font-family: Paralucent-bold;
    }
    p {
        color: var(--smooht-gray-spec-cl);
        font-size: 15px;
        max-width: 80%;
        line-height: 30px;
    }

    @media (max-width: 1300px) {
        h1 {
            font-size: 100px;
        }
        p {
            line-height: normal;
        }
        h5 {
            margin-bottom: 1rem;
        }
    }

    @media (max-width: 950px) {
        h1 {
            font-size: 59px;
        }
        p {
            font-size: 13px;
        }
        h4 {
            font-size: 15px;
        }
    }
    @media (max-width: 400px) {
        h1 {
            font-size: 30px;
        }
    }
`;

export const watchDiv = styled.div``;
