import React from "react";
import * as comment from "./UserCommentComponent.style";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { BiDislike } from "@react-icons/all-files/bi/BiDislike";

function UserCommentComponent({ data, fetch_comments }) {
    return (
        <comment.div>
            <comment.flexDiv>
                <comment.widthDiv>
                    <comment.userImage
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
                                      } else if (data.user) {
                                          return {
                                              backgroundImage: `url(${data.user.imageUrl})`,
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
                    </comment.userImage>
                </comment.widthDiv>
                <comment.commentDiv>
                    <h5>
                        {(() => {
                            if (fetch_comments) {
                                if (data.googleUserId) {
                                    return data.googleUserId.name;
                                } else if (data.logInUserId) {
                                    return data.logInUserId.name;
                                } else if (data.user) {
                                    return data.user.name;
                                }
                            }
                        })()}
                    </h5>
                    <span>{data.commentTime}</span>
                    <p>{data.comment}</p>
                    <comment.mr>
                        <comment.flexDiv>
                            <AiOutlineLike />
                            <BiDislike />
                        </comment.flexDiv>
                    </comment.mr>
                </comment.commentDiv>
            </comment.flexDiv>
        </comment.div>
    );
}

export default UserCommentComponent;
