import React, { useState } from "react";
import * as chat from "./ChatBoxControllesComponent.style";
import { RiSendPlaneLine } from "@react-icons/all-files/ri/RiSendPlaneLine";
import Picker from "emoji-picker-react";
import { HiOutlineEmojiHappy } from "@react-icons/all-files/hi/HiOutlineEmojiHappy";
import { useDispatch, useSelector } from "react-redux";
import { sendMovieComment } from "../../Redux/Action/indexAction";
import { insertCommentLoading } from "../../Redux/Action/appAction";
import { useParams } from "react-router";
import { Spin } from "antd";

function ChatBoxControllesComponent({ cookies }) {
    const [Message, setMessage] = useState("");
    const [ShowPicker, setShowPicker] = useState(false);
    const loadingCommentSendButton = useSelector((state) => state.index.loadingCommentSendButton);
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
            dispatch(insertCommentLoading(true));
        }
    };

    const SendEnterEvent = function (event) {
        if (event.code === "Enter") {
            SendMessageHandler();
        }
    };

    return (
        <chat.chatBottomConterollDiv>
            <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{
                    width: "300px",
                    position: "absolute",
                    bottom: "85px",
                    left: "0px",
                    visibility: `${ShowPicker ? "visible" : "hidden"}`,
                    opacity: `${ShowPicker ? "1" : 0}`,
                    transition: "all .2s ease",
                }}
            />
            <chat.chatInputBox>
                <HiOutlineEmojiHappy onClick={() => setShowPicker(!ShowPicker)} />
                <input type="text" placeholder="Aa" onChange={UserMessage} value={Message} onKeyPress={SendEnterEvent} />
                {loadingCommentSendButton ? <Spin /> : <RiSendPlaneLine onClick={SendMessageHandler} />}
            </chat.chatInputBox>
        </chat.chatBottomConterollDiv>
    );
}

export default ChatBoxControllesComponent;
