import styled from "styled-components";

export const card = styled.div`
    overflow: hidden;
    width: 400px;
    height: 600px;
    padding: 1rem;
    background: #fff;
    box-shadow: 1px 22px 44px rgba(0, 0, 0, 0.19);
    transition: 0.6s;
    border-radius: 2px;
    position: relative;
    display: flex;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &:hover {
        box-shadow: 1px 12px 34px rgba(0, 0, 0, 0.31);
    }
    &:hover .sinopse {
        opacity: 1;
        transition-delay: 0.4s;
    }
    &:hover .sinopse .view {
        opacity: 1;
        transform: translateY(0%);
        transition: 0.6s;
        transition-delay: 1s;
    }
    &:hover .sinopse .content-sinopse .text {
        transform: translateY(0);
        transition-delay: 0.6s;
    }
    &:hover .sinopse .content-sinopse .title {
        transform: translateY(0);
        transition-delay: 0.2s;
    }
    &:hover .date {
        transform: translateY(-100%);
        opacity: 0;
    }
    &:hover .content {
        transform: translateY(100%);
        opacity: 0;
    }
    .content {
        transition: 0.8s;
        display: flex;
        flex-wrap: wrap;
        align-self: flex-end;
        padding: 25px 25px 50px 25px;
    }
    .content .title {
        width: 100%;
        color: #fff;
        font-size: 30px;
        font-weight: 700;
        line-height: 50px;
        margin-bottom: 12px;
    }
    .content .text {
        width: 100%;
        color: #fff;
        font-size: 16px;
        font-weight: 300;
    }
    .sinopse {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        padding: 25px 25px 50px 25px;
        background: rgba(0, 0, 0, 0.78);
        color: #fff;
        font-weight: 300;
        opacity: 0;
        transition: 0.8s;
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
    }
    .sinopse iframe {
        position: absolute;
        top: 0;
        width: 100%;
        margin-left: -30px;
        height: 260px;
    }
    .sinopse .view {
        position: absolute;
        bottom: 15px;
        right: 25px;
        color: #fff;
        font-size: 14px;
        border-bottom: 1px solid #fff;
        opacity: 0;
        transform: translateY(100%);
        transition: 0.6s;
        cursor: pointer;
    }
    .sinopse .content-sinopse .title {
        color: rgba(255, 255, 255, 0.6);
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 12px;
        transform: translateY(-100%);
        transition: 0.6s;
    }
    .sinopse .content-sinopse .text {
        transform: translateY(100%);
        transition: 0.6s;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 300;
        font-size: 14px;
    }
`;

export const dateDiv = styled.div`
    position: absolute;
    top: 25px;
    right: 25px;
    color: #fff;
    font-weight: 300;
    font-size: 14px;
    transition: 0.8s;
    .tv_ico img {
        width: 12px;
        vertical-align: baseline;
        margin-left: 6px;
    }
`;
