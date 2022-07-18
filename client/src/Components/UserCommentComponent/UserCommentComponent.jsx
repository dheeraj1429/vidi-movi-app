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

function UserCommentComponent({ data, fetch_comments, user, currentMovie, userCookie }) {
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
        if (data && user && user.data && userCookie && userCookie.user && userCookie.user.data) {
            dispatch(
                userLikeCurrentMovieCommnets({
                    userToken: userCookie.user.data.token,
                    movieId: currentMovie,
                    commentId: data._id,
                    userIdentity: userCookie.user.data.googleId ? "google" : "login",
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
        if (userCookie?.user?.data && data && data?.likedUsers) {
            const id = userCookie.user.data._id;
            const provider = userCookie.user.data.provider;

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
                                          if (data.googleUserId && !data.googleUserId.uploadCustomProfileImage) {
                                              return {
                                                  backgroundImage: `url(${data.googleUserId.imageUrl})`,
                                              };
                                          } else if (data.googleUserId && data.googleUserId.uploadCustomProfileImage) {
                                              return {
                                                  backgroundImage: `url(/compressUserProfileImages/${data.googleUserId.imageUrl})`,
                                              };
                                          } else if (data.logInUserId && data.logInUserId.uploadCustomProfileImage) {
                                              return {
                                                  backgroundImage: `url(/compressUserProfileImages/${data.logInUserId.imageUrl})`,
                                              };
                                          } else if (data.logInUserId && data.logInUserId.uploadCustomProfileImage) {
                                              return {
                                                  backgroundImage: `url(${data.logInUserId.imageUrl})`,
                                              };
                                          } else if (user.data.imageUrl && !user.data.uploadCustomProfileImage) {
                                              return {
                                                  backgroundImage: `url(${user.data.imageUrl})`,
                                              };
                                          } else if (data.user.imageUrl && data.user.uploadCustomProfileImage) {
                                              return {
                                                  backgroundImage: `url(/compressUserProfileImages/${data.user.imageUrl})`,
                                              };
                                          }
                                      })()
                                    : null
                            }
                        />
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
                        {user && user.data && !!user.data ? (
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
