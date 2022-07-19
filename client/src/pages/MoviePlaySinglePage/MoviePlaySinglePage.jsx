import React from "react";
import * as single from "./MoviePlaySinglePage.style";
import VideoComponent from "../../Components/VideoComponent/VideoComponent";
import SingelVideoContentComponent from "../../Components/SingelVideoContentComponent/SingelVideoContentComponent";
// import ChatBoxComponent from "../../Components/ChatBoxComponent/ChatBoxComponent";
import UserCommentsComponent from "../../Components/UserCommentsComponent/UserCommentsComponent";
import ChatBoxControllesComponent from "../../Components/ChatBoxControllesComponent/ChatBoxControllesComponent";
import ReportConatianerComponent from "../../Components/ReportConatianerComponent/ReportConatianerComponent";
import { useSelector } from "react-redux";

function MoviePlaySinglePage() {
    const user = useSelector((state) => state.auth.user);

    return (
        <single.div>
            <ReportConatianerComponent />
            <single.flexDiv>
                <single.moviDiv>
                    <VideoComponent />
                    <SingelVideoContentComponent />
                    {/* <ChatBoxComponent /> */}
                </single.moviDiv>
                <single.contentDiv>
                    {!!user && user.data ? <ChatBoxControllesComponent user={user} /> : null}
                    <h4 className="comments_heding">Comments</h4>
                    <UserCommentsComponent />
                </single.contentDiv>
            </single.flexDiv>
        </single.div>
    );
}

export default MoviePlaySinglePage;
