import React, { useEffect, useState } from "react";
import * as chat from "./ChatBoxComponent.style";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import UserChatMessages from "../UserChatMessages/UserChatMessages";
import ChatBoxControllesComponent from "../ChatBoxControllesComponent/ChatBoxControllesComponent";
import { backendConfigData } from "../../Utils/backendData";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userComments } from "../../Redux/Action/indexAction";

function ChatBoxComponent() {
    const params = useParams().id;
    const socket = io.connect(backendConfigData.socketIoUrl);
    const dispatch = useDispatch();
    const movieComments = useSelector((state) => state.index.movieComments);

    const joinFuntion = async function () {
        console.log(params);
        await socket.emit("join_room", params);
    };

    useEffect(() => {
        dispatch(userComments(params));

        joinFuntion();
        socket.on("user_joined", (data) => {
            console.log(data);
        });
    }, []);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        });
    }, [socket]);

    return (
        <chat.div>
            <chat.innerDiv>
                <chat.chatHeading>
                    <chat.flexDiv>
                        <div>
                            <h1>Comments</h1>
                        </div>
                        <div>
                            <BsSearch />
                        </div>
                    </chat.flexDiv>
                </chat.chatHeading>
                <chat.chatScreen>
                    {/* {movieComments && movieComments.success ? movieComments.comments.map((el) => <UserChatMessages key={el._id} data={el} />) : null} */}
                    {/* {UserComment && !!UserComment.length ? UserComment.map((el) => console.log(el)) : null} */}
                </chat.chatScreen>
                <ChatBoxControllesComponent socket={socket} />
            </chat.innerDiv>
        </chat.div>
    );
}

export default ChatBoxComponent;
