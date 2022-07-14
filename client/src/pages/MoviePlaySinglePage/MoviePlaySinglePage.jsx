import React from "react";
import * as single from "./MoviePlaySinglePage.style";
import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import SingelVideoContentComponent from "../../Components/SingelVideoContentComponent/SingelVideoContentComponent";
// import ChatBoxComponent from "../../Components/ChatBoxComponent/ChatBoxComponent";
import UserCommentsComponent from "../../Components/UserCommentsComponent/UserCommentsComponent";
import ChatBoxControllesComponent from "../../Components/ChatBoxControllesComponent/ChatBoxControllesComponent";
import { useCookies } from "react-cookie";
import ReportConatianerComponent from "../../Components/ReportConatianerComponent/ReportConatianerComponent";

function MoviePlaySinglePage() {
    const [cookies] = useCookies(["user"]);

    return (
        <single.div>
            <ReportConatianerComponent />
            <single.flexDiv>
                <single.moviDiv>
                    <VideoComponent />
                    <SingelVideoContentComponent />
                    {/* <ChatBoxComponent /> */}
                    {!!cookies.user ? <ChatBoxControllesComponent cookies={cookies} /> : null}
                </single.moviDiv>
                <single.contentDiv>
                    <UserCommentsComponent />
                </single.contentDiv>
            </single.flexDiv>
        </single.div>
    );
}

export default MoviePlaySinglePage;
