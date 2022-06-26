import React, { useState, useEffect } from "react";
import * as chat from "./ChatBoxControllesComponent.style";
import { RiSendPlaneLine } from "@react-icons/all-files/ri/RiSendPlaneLine";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

function ChatBoxControllesComponent({ socket }) {
    const [Message, setMessage] = useState("");
    const params = useParams().id;
    const [cookies] = useCookies(["user"]);

    const UserMessage = useCallback(
        function (e) {
            const value = e.target.value;
            setMessage(value);
        },
        [Message]
    );

    const SendMessageHandler = async function () {
        const date = new Date();

        if (cookies.user && !!Message && cookies.user.data) {
            const sendData = {
                token: cookies.user.data.token,
                message: Message,
                time: date.getFullYear() + ":" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
                room: params,
            };

            await socket.emit("message", sendData);
        }
    };

    return (
        <chat.chatBottomConterollDiv>
            <chat.chatInputBox>
                <input type="text" placeholder="Aa" onChange={UserMessage} value={Message} />
                <RiSendPlaneLine onClick={SendMessageHandler} />
            </chat.chatInputBox>
        </chat.chatBottomConterollDiv>
    );
}

export default ChatBoxControllesComponent;
