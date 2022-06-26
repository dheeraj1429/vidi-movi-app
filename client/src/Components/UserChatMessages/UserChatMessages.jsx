import React from "react";
import * as chat from "./UserChatMessages.style";

function UserChatMessages({ data }) {
    return (
        <chat.div>
            <chat.userProfile
                style={
                    data.googleUser
                        ? {
                              backgroundImage: `url(${data.googleUser.imageUrl})`,
                          }
                        : null
                }
            />
            <chat.arrowDiv />
            <chat.userMessage>
                <chat.user>
                    <p>{data.loginUser ? data.loginUser.name : data.googleUser.name}</p>
                </chat.user>
                <p>{data.comment}</p>
                <div>
                    <span>{data.time}</span>
                </div>
            </chat.userMessage>
        </chat.div>
    );
}

export default UserChatMessages;
