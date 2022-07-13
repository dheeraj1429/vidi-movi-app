import React, { useState, useEffect, useLayoutEffect } from "react";
import * as comment from "./UserCommentComponent.style";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { VscReport } from "@react-icons/all-files/vsc/VscReport";
import { BiDislike } from "@react-icons/all-files/bi/BiDislike";
import { userLikeCurrentMovieCommnets } from "../../Redux/Action/indexAction";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { useCookies } from "react-cookie";

function UserCommentComponent({ data, fetch_comments, user, currentMovie }) {
    const dispatch = useDispatch();
    const [cookies] = useCookies(["user"]);
    const [LikeCount, setLikeCount] = useState(data?.likedUsers?.length || 0);
    const [UserLikedComment, setUserLikedComment] = useState(false);

    const UserCommentLikeHandler = function () {
        if (data && cookies.user && cookies.user.data) {
            dispatch(
                userLikeCurrentMovieCommnets({
                    userToken: user.user.data.token,
                    movieId: currentMovie,
                    commentId: data._id,
                    userIdentity: data.logInUserId ? "login" : "google",
                })
            );

            setUserLikedComment(!UserLikedComment);

            if (UserLikedComment) {
                setLikeCount((prev) => prev - 1);
            } else {
                setLikeCount((prev) => prev + 1);
            }
        }
    };

    useLayoutEffect(() => {
        if (cookies?.user?.data && data && data?.likedUsers) {
            data.likedUsers.forEach((el) => {
                if (el[`${cookies.user.data.provider === "google" ? "googleUserId" : "logInUserId"}`] === cookies.user.data._id) {
                    setUserLikedComment(true);
                }
            });
        } else return;
    }, []);

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
                    {user && user.user && !!user.user.data ? (
                        <comment.mr>
                            <comment.flexDiv>
                                <Box sx={{ color: "action.active", marginRight: "1.5rem" }}>
                                    <Badge badgeContent={LikeCount} color="info">
                                        <AiOutlineLike onClick={UserCommentLikeHandler} className={UserLikedComment ? "active_button" : ""} />
                                    </Badge>
                                </Box>
                                <Box>
                                    <VscReport />
                                </Box>
                            </comment.flexDiv>
                        </comment.mr>
                    ) : null}
                </comment.commentDiv>
            </comment.flexDiv>
        </comment.div>
    );
}

export default UserCommentComponent;
