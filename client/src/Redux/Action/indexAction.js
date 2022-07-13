import ACTION_TYPE from "../ActionType/ActionType";
import axios from "axios";
import { headers } from "./headers";
axios.defaults.timeout = 2000;

export const getAllMovies = function () {
    return async function (dispatch) {
        try {
            const getMovie = await axios.get("/index/get-all-movies", headers);

            dispatch({
                type: ACTION_TYPE.GET_ALL_MOVIES,
                payload: getMovie && getMovie.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const stremVideo = function (data) {
    return async function (dispatch) {
        try {
            await axios.get("/index/stremVideo/:name", data, headers);
        } catch (err) {
            console.log(err);
        }
    };
};

export const fetchSelectedMovi = function (id) {
    return async function (dispatch) {
        try {
            const fetchMovieFromDb = await axios.get(`/index/get-one-movie/${id}`, headers);

            dispatch({
                type: ACTION_TYPE.SELECTED_MOVIE,
                payload: fetchMovieFromDb && fetchMovieFromDb.data && fetchMovieFromDb.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const storeHistoryVideo = function (data) {
    return async function (dispatch) {
        try {
            await axios.post(`/index/video-history`, data, headers);
        } catch (err) {
            console.log(err);
        }
    };
};

export const userHistory = function () {
    return async function (dispatch) {
        try {
            const findUserHistory = await axios.get("/index/user-history", headers);

            if (findUserHistory && findUserHistory.data.movieHistoryObject) {
                dispatch({
                    type: ACTION_TYPE.USER_HISTORY,
                    payload: findUserHistory && findUserHistory.data && findUserHistory.data.movieHistoryObject,
                });
            } else {
                dispatch({
                    type: ACTION_TYPE.USER_HISTORY,
                    payload: findUserHistory && findUserHistory.data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const removeUserOneMovieHistory = function (data) {
    return async function (dispatch) {
        try {
            const removeUserHistory = await axios.post("/index/remove-user-history", data, headers);

            if (removeUserHistory && removeUserHistory.data.success) {
                dispatch({
                    type: ACTION_TYPE.REMOVER_USER_ONE_HISTORY_MOVIE,
                    payload: data && data.movieSelectedId,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const movieLike = function (data) {
    return async function (dispatch) {
        try {
            const userLikeMovie = await axios.post("/index/like-movies", data, headers);

            if (userLikeMovie) {
                dispatch({
                    type: ACTION_TYPE.MOVIS_IS_LIKED,
                    payload: userLikeMovie && userLikeMovie.data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const getAllLikeMovies = function () {
    return async function (dispatch) {
        try {
            const getUserAllLikeMovies = await axios.get("/index/get-all-liked-movies", headers);

            if (getUserAllLikeMovies && getUserAllLikeMovies.data.moviesLikedObject) {
                dispatch({
                    type: ACTION_TYPE.GET_ALL_LIKE_MOVIES,
                    payload: getUserAllLikeMovies && getUserAllLikeMovies.data && getUserAllLikeMovies.data.moviesLikedObject,
                });
            } else {
                dispatch({
                    type: ACTION_TYPE.GET_ALL_LIKE_MOVIES,
                    payload: getUserAllLikeMovies && getUserAllLikeMovies.data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const videoViewsFunction = function (data) {
    return async function (dispatch) {
        try {
            await axios.patch("/index/video-views", data, headers);
        } catch (err) {
            console.log(err);
        }
    };
};

export const userPlayListVideo = function (data) {
    return async function (dispatch) {
        try {
            const storeUserPlayList = await axios.post("/index/user-play-list-video", data, headers);
            if (storeUserPlayList) {
                dispatch({
                    type: ACTION_TYPE.USER_VIDEO_IN_PLAYLIST,
                    payload: storeUserPlayList && storeUserPlayList.data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const getUserPlayListVideo = function () {
    return async function (dispatch) {
        try {
            const getUserPLayListMovies = await axios.get("/index/get-user-playlist", headers);
            if (getUserPLayListMovies && getUserPLayListMovies.data.playListArray) {
                dispatch({
                    type: ACTION_TYPE.USER_ALL_VIDEO_PLAYLIST,
                    payload: getUserPLayListMovies && getUserPLayListMovies.data.playListArray,
                });
            } else {
                dispatch({
                    type: ACTION_TYPE.USER_ALL_VIDEO_PLAYLIST,
                    payload: getUserPLayListMovies && getUserPLayListMovies.data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const setVideoCurrentTime = function (data) {
    return async function (dispatch) {
        try {
            await axios.post("/index/update-video-current-time", data, headers);
        } catch (err) {
            console.log(err);
        }
    };
};

export const searchMovieName = function (data) {
    return async function (dispatch) {
        try {
            const searchData = await axios.get(`/index/movies-name-search/${data.movieName}`, headers);

            dispatch({
                type: ACTION_TYPE.SEARCH_MOVIE_IN_DB,
                payload: searchData && searchData.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const getAllSearchMovies = function (data) {
    return async function (dispatch) {
        try {
            const searchMovies = await axios.get(`/index/get-all-search-movies/${data.searchQuery}`, headers);

            dispatch({
                type: ACTION_TYPE.GET_ALL_SEARCH_MOVIES,
                payload: searchMovies && searchMovies.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const deleteLikeVideo = function (data) {
    return async function (dispatch) {
        try {
            const userLiveVideoDelete = await axios.patch("/index/delete-like-video", data, headers);

            if (userLiveVideoDelete && userLiveVideoDelete.data.moviesLikedObject) {
                dispatch({
                    type: ACTION_TYPE.GET_ALL_LIKE_MOVIES,
                    payload: userLiveVideoDelete.data.moviesLikedObject,
                });
            } else {
                dispatch({
                    type: ACTION_TYPE.GET_ALL_LIKE_MOVIES,
                    payload: userLiveVideoDelete && userLiveVideoDelete.data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const removeUserAllHistory = function (data) {
    return async function (dispatch) {
        try {
            const userHistory = await axios.patch("/index/delete-user-all-history", headers);
            if (userHistory.data.success) {
                dispatch({
                    type: ACTION_TYPE.DELETE_ALL_USER_HISTORY,
                    payload: data,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const removeALlSelectedMovies = function (data) {
    return async function (dispatch) {
        try {
            const removeSelectedMovies = await axios.patch("/index/delete-all-selected-history", data, headers);

            if (removeSelectedMovies.data.success) {
                dispatch({
                    type: ACTION_TYPE.REMOVE_ALL_SELECTED_MOVIES_FROM_HISTORY,
                    payload: data.moviesId,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const searchHistoryMovies = function (data) {
    return async function (dispatch) {
        try {
            const searchHistory = await axios.get(`/index/search-history-movies/${data}`, headers);
            console.log(searchHistory);
        } catch (err) {
            console.log(err);
        }
    };
};

export const getMoviesComments = function (data) {
    return async function (dispatch) {
        try {
            const comments = await axios.get(`/index/get-movies-comments/${data}`, headers);

            dispatch({
                type: ACTION_TYPE.GET_MOVIES_COMMENTS,
                payload: comments && comments.data && comments.data.userComments && comments.data.userComments.comments,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const sendMovieComment = function (data) {
    const obj = {
        comment: data.comment,
        id: data.id,
        name: data.name,
        user: data.user.data.token,
    };

    return async function (dispatch) {
        try {
            const snedUserComment = await axios.post("/index/insert-new-movie-comment", obj, headers);

            if (!!snedUserComment.data.success) {
                dispatch({
                    type: ACTION_TYPE.SEND_MOVIE_COMMENTS,
                    payload: {
                        comment: data.comment,
                        id: data.id,
                        name: data.name,
                        user: data.user.data,
                        commentTime: new Date().toLocaleString(),
                    },
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const userLikeCurrentMovieCommnets = function (data) {
    return async function (dispatch) {
        try {
            await axios.post("/index/user-like-movies-comments", data, headers);
        } catch (err) {
            console.log(err);
        }
    };
};
