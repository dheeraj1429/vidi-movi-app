import React from "react";
import * as single from "./MoviePlaySinglePage.style";
import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import SingelVideoContentComponent from "../../Components/SingelVideoContentComponent/SingelVideoContentComponent";
// import ChatBoxComponent from "../../Components/ChatBoxComponent/ChatBoxComponent";
import UserCommentsComponent from "../../Components/UserCommentsComponent/UserCommentsComponent";
import ChatBoxControllesComponent from "../../Components/ChatBoxControllesComponent/ChatBoxControllesComponent";
import { useCookies } from "react-cookie";

function MoviePlaySinglePage() {
    const [cookies] = useCookies(["user"]);

    return (
        <single.div>
            <single.flexDiv>
                <single.moviDiv>
                    <VideoComponent />
                    <UserCommentsComponent />
                </single.moviDiv>
                <single.contentDiv>
                    <SingelVideoContentComponent />
                    {/* <ChatBoxComponent /> */}
                    {!!cookies.user ? <ChatBoxControllesComponent cookies={cookies} /> : null}
                </single.contentDiv>
            </single.flexDiv>
        </single.div>
    );
}

export default MoviePlaySinglePage;
