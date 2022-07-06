import React, { useEffect } from "react";
import * as comment from "./UserCommentsComponent.style";
import UserCommentComponent from "../UserCommentComponent/UserCommentComponent";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getMoviesComments } from "../../Redux/Action/indexAction";
import { removeMoviesAllComments } from "../../Redux/Action/appAction";

function UserCommentsComponent() {
    const movieComments = useSelector((state) => state.index.movieComments);
    const currentMovieComment = useSelector((state) => state.index.currentMovieComment);

    const params = useParams().id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMoviesComments(params));

        return () => {
            dispatch(removeMoviesAllComments(null));
        };
    }, []);

    console.log(currentMovieComment);

    return (
        <comment.div>
            <comment.commentScreen>
                <h4 className="comments_heding">Comments</h4>
                {currentMovieComment && !!currentMovieComment.length
                    ? currentMovieComment.map((el) => <UserCommentComponent fetch_comments={true} key={el.id} data={el} />)
                    : null}
                {movieComments && !!movieComments.length
                    ? movieComments.map((el) => <UserCommentComponent fetch_comments={true} key={el._id} data={el} />)
                    : null}
            </comment.commentScreen>
        </comment.div>
    );
}

export default UserCommentsComponent;
