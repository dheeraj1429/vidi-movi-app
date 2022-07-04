import React from "react";
import * as chat from "./UserChatMessages.style";

function UserChatMessages({ data, fetch_comments }) {
    return (
        <chat.div>
            <chat.userProfile
                style={
                    fetch_comments
                        ? (() => {
                              if (data.googleUserId) {
                                  return {
                                      backgroundImage: `url(${data.googleUserId.imageUrl})`,
                                  };
                              } else if (data.logInUserId) {
                                  return {
                                      background: "var(--google-button-cl)",
                                  };
                              }
                          })()
                        : data.imageUrl
                        ? {
                              backgroundImage: `url(${data.imageUrl})`,
                          }
                        : {
                              background: "var(--google-button-cl)",
                          }
                }
            >
                {fetch_comments ? (
                    (() => {
                        if (data.logInUserId) {
                            return <p>{data.logInUserId.name.toUpperCase().slice(0, 1)}</p>;
                        }
                    })()
                ) : data.imageUrl ? null : (
                    <p>{data.name.toUpperCase().slice(0, 1)}</p>
                )}
            </chat.userProfile>
            <chat.arrowDiv />
            <chat.userMessage>
                <chat.user>
                    {fetch_comments ? (
                        (() => {
                            if (data.googleUserId) {
                                return <p>{data.googleUserId.name}</p>;
                            } else if (data.logInUserId) {
                                return <p>{data.logInUserId.name}</p>;
                            }
                        })()
                    ) : (
                        <p>{data.name}</p>
                    )}
                </chat.user>
                <p>{data.comment}</p>
                <div>
                    <span>{data.commentTime}</span>
                </div>
            </chat.userMessage>
        </chat.div>
    );
}

export default UserChatMessages;
