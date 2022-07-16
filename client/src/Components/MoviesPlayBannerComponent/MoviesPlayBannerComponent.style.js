import styled from "styled-components";

export const div = styled.div`
    border-radius: 10px;
    overflow: hidden;
`;

export const section = styled.section`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    padding: 6.5em 0;
    #banner_content_wrapper {
        width: 900px;
        max-width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const content = styled.div`
    float: left;
    width: 500px;
    margin-left: 100px;
    .title {
        display: inline;
        font-size: 1.75em;
        color: #ffffff;
    }
    .ratings i {
        color: #73e298;
        font-size: 1.35em;
        margin: 0 0.15em;
    }
    .ratings .inactive {
        color: #48494d;
    }
    .description {
        color: #bbbebf;
        font-size: 1em;
        line-height: 2;
    }
    .info {
        color: #ffffff;
        font-size: 0.8em;
        font-weight: 700;
        margin-top: 3em;
    }
    .info span {
        margin: 0 0.5em;
    }
`;

export const poster = styled.div`
    width: 275px;
    position: relative;
    float: left;
    .featured_image {
        width: 100%;
        max-width: 100%;
        border-radius: 0.5em;
        box-shadow: 0px 0px 76px 0px rgba(0, 0, 0, 0.47);
    }
    .play_button {
        position: absolute;
        width: 80px;
        left: 50%;
        top: 50%;
        margin: -40px 0 0 -40px;
    }
`;
