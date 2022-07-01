import React, { useEffect } from "react";
import * as chat from "./ChatBoxComponent.style";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import ChatBoxControllesComponent from "../ChatBoxControllesComponent/ChatBoxControllesComponent";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router";
const ENDPOINT = `ws://localhost:9005`;

function ChatBoxComponent() {
    const socket = socketIOClient(ENDPOINT);
    const params = useParams().id;

    useEffect(() => {}, [socket]);

    useEffect(() => {
        socket.emit("JOIN_ROOM", {
            id: params,
        });
    }, []);

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
