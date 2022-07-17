import React, { useState, useLayoutEffect } from "react";
import * as comment from "./UserCommentComponent.style";
import { AiOutlineLike } from "@react-icons/all-files/ai/AiOutlineLike";
import { VscReport } from "@react-icons/all-files/vsc/VscReport";
import { userLikeCurrentMovieCommnets } from "../../Redux/Action/indexAction";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { showRepoertComponent } from "../../Redux/Action/appAction";
import { useParams } from "react-router";

function UserCommentComponent({ data, fetch_comments, user, currentMovie }) {
    const dispatch = useDispatch();
    const [LikeCount, setLikeCount] = useState(data?.likedUsers?.length || 0);
    const [UserLikedComment, setUserLikedComment] = useState(false);
    const params = useParams();

    const movieName = params.name;
    const currentMovieId = params.id;

    const commentReportHandler = function () {
        const reportObj = {
            commentId: data._id,
            movieName,
            currentMovieId,
        };
        dispatch(showRepoertComponent(reportObj));
    };

    const UserCommentLikeHandler = function () {
        if (data && user && user.user.data) {
            dispatch(
                userLikeCurrentMovieCommnets({
                    userToken: user.user.data.token,
                    movieId: currentMovie,
                    commentId: data._id,
                    userIdentity: user.user.data.googleId ? "google" : "login",
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
        if (user?.user?.data && data && data?.likedUsers) {
            const id = user.user.data._id;
            const provider = user.user.data.provider;

            data.likedUsers.filter((el) => {
                if (el[`${provider === "google" ? "googleUserId" : "logInUserId"}`] === id) {
                    setUserLikedComment(true);
                }
            });
        } else return;
    }, []);

    return (
        <comment.div>
            {!!data ? (
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
                                          } else if (data.user.imageUrl) {
                                              return {
                                                  backgroundImage: `url(${data.user.imageUrl})`,
                                              };
                                          } else {
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
                                    } else if (data?.user?.imageUrl) {
                                        return <p></p>;
                                    } else if (data.user) {
                                        return <p>{data.user.name.toUpperCase().slice(0, 1)}</p>;
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
                                    <Box sx={{ color: "action.active", marginRight: "1.5rem" }}>
                                        <VscReport onClick={commentReportHandler} />
                                    </Box>
                                </comment.flexDiv>
                            </comment.mr>
                        ) : null}
                    </comment.commentDiv>
                </comment.flexDiv>
            ) : null}
        </comment.div>
    );
}

export default UserCommentComponent;
