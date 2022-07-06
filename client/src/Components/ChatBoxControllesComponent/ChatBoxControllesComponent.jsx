import React, { useState } from "react";
import * as chat from "./ChatBoxControllesComponent.style";
import { RiSendPlaneLine } from "@react-icons/all-files/ri/RiSendPlaneLine";
import Picker from "emoji-picker-react";
import { HiOutlineEmojiHappy } from "@react-icons/all-files/hi/HiOutlineEmojiHappy";
import { useDispatch } from "react-redux";
import { sendMovieComment } from "../../Redux/Action/indexAction";
import { useParams } from "react-router";

function ChatBoxControllesComponent({ cookies }) {
    const [Message, setMessage] = useState("");
    const [ShowPicker, setShowPicker] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const { id, name } = params;

    const onEmojiClick = (event, emojiObject) => {
        setMessage((PrevState) => [...PrevState, emojiObject.emoji].join(""));
    };

    const UserMessage = function (e) {
        const value = e.target.value;
        setMessage(value);
    };

    const SendMessageHandler = function () {
        if (!!Message.length && !!cookies.user) {
            dispatch(sendMovieComment({ id, name, user: cookies.user, comment: Message }));
            // socket.emit("send_comment", { Message, user: cookies.user.data.token, room });
            setMessage("");
            setShowPicker(false);
        }
    };

    return (
        <chat.chatBottomConterollDiv>
            <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{
                    width: "300px",
                    position: "absolute",
                    top: "85px",
                    left: "0px",
                    visibility: `${ShowPicker ? "visible" : "hidden"}`,
                    opacity: `${ShowPicker ? "1" : 0}`,
                    transition: "all .2s ease",
                }}
            />
            <chat.chatInputBox>
                <HiOutlineEmojiHappy onClick={() => setShowPicker(!ShowPicker)} />
                <input type="text" placeholder="Aa" onChange={UserMessage} value={Message} />
                <RiSendPlaneLine onClick={SendMessageHandler} />
            </chat.chatInputBox>
        </chat.chatBottomConterollDiv>
    );
}

export default ChatBoxControllesComponent;
