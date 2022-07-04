import React, { useEffect, useState } from "react";
import * as chat from "./ChatBoxComponent.style";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import ChatBoxControllesComponent from "../ChatBoxControllesComponent/ChatBoxControllesComponent";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router";
import { getMoviesComments } from "../../Redux/Action/indexAction";
import { useSelector, useDispatch } from "react-redux";
import UserChatMessages from "../UserChatMessages/UserChatMessages";
const ENDPOINT = `ws://localhost:9005`;

function ChatBoxComponent() {
    const socket = socketIOClient(ENDPOINT, { transports: ["websocket"] });
    const params = useParams().id;
    const [UserComments, setUserComments] = useState([]);
    const dispatch = useDispatch();
    const movieComments = useSelector((state) => state.index.movieComments);

    useEffect(() => {
        socket.emit("JOIN_ROOM", { roomId: params });
        socket.on("user_join", (data) => {
            // show the all chat when the user is join the room
            console.log(data);
        });

        dispatch(getMoviesComments(params));

        return () => {
            socket.emit("forceDisconnect");
        };
    }, []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`socket user ${socket.id} is connected`);
        });

        socket.on("receve_comment", (receve) => {
            console.log(receve);
            setUserComments((PrevState) => [...PrevState, receve]);
        });
    }, [socket]);

    console.log(UserComments);

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
                    {movieComments && !!movieComments.length
                        ? movieComments.map((el) => <UserChatMessages key={el._id} data={el} fetch_comments={true} />)
                        : null}
                    {UserComments && !!UserComments.length ? UserComments.map((el) => <UserChatMessages key={el.uId} data={el} />) : null}
                </chat.chatScreen>
                <ChatBoxControllesComponent socket={socket} room={params} />
            </chat.innerDiv>
        </chat.div>
    );
}

export default ChatBoxComponent;
