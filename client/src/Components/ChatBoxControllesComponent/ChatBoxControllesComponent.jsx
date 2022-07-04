import React, { useState } from "react";
import * as chat from "./ChatBoxControllesComponent.style";
import { RiSendPlaneLine } from "@react-icons/all-files/ri/RiSendPlaneLine";
import { useCookies } from "react-cookie";

function ChatBoxControllesComponent({ socket, room }) {
    const [Message, setMessage] = useState("");
    const [cookies] = useCookies(["user"]);

    const UserMessage = function (e) {
        const value = e.target.value;
        setMessage(value);
    };

    const SendMessageHandler = function () {
        if (!!Message.length && !!cookies.user) {
            socket.emit("send_comment", { Message, user: cookies.user.data.token, room });
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
