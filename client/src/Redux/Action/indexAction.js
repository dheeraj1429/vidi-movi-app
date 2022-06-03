import ACTION_TYPE from "../ActionType/ActionType";
import axios from "axios";
import { headers } from "./headers";

export const getAllMovies = function () {
    return async function (dispatch) {
        try {
            const moviesRef = await axios.get("/index/get-all-movies", headers);

            dispatch({
                type: ACTION_TYPE.GET_ALL_MOVIES,
                payload: moviesRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const overlayDiv = function (data) {
    return {
        type: ACTION_TYPE.OVER_LAY_DIV,
        payload: data,
    };
};

export const togglePopUp = function (data) {
    return {
        type: ACTION_TYPE.TOGGLE_POPUP,
        payload: data,
    };
};

export const showOptionPopup = function (data) {
    return {
        type: ACTION_TYPE.SHOW_OPTIONS_POPUP,
        payload: data,
    };
};

export const themChange = function (data) {
    return {
        type: ACTION_TYPE.CHANGE_THEME,
        payload: data,
    };
};

export const selectedMovies = function (data) {
    return {
        type: ACTION_TYPE.SELECTED_MOVIE,
        payload: data,
    };
};

export const stremVideo = function (data) {
    return async function (dispatch) {
        try {
            const videoRef = await axios.get("/index/stremVideo/:name", data, headers);
            console.log(videoRef);
        } catch (err) {
            console.log(err);
        }
    };
};

export const fetchSelectedMovi = function (id) {
    return async function (dispatch) {
        try {
            const movieRef = await axios.get(`/index/get-one-movie/${id}`, headers);

            dispatch({
                type: ACTION_TYPE.SELECTED_MOVIE,
                payload: movieRef.data.data,
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

export const userHistory = function (data) {
    return async function (dispatch) {
        try {
            const userHistoryRef = await axios.get("/index/user-history", headers);

            if (userHistoryRef && userHistoryRef.data.movieHistoryObject) {
                dispatch({
                    type: ACTION_TYPE.USER_HISTORY,
                    payload: userHistoryRef.data.movieHistoryObject,
                });
            } else {
                dispatch({
                    type: ACTION_TYPE.USER_HISTORY,
                    payload: userHistoryRef.data,
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
            const removerHistoryRef = await axios.post("/index/remove-user-history", data, headers);
            if (removerHistoryRef && removerHistoryRef.data) {
                dispatch({
                    type: ACTION_TYPE.REMOVER_USER_ONE_HISTORY_MOVIE,
                    payload: data.movieSelectedId,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
};

export const removeClientHistory = function (data) {
    return {
        type: ACTION_TYPE.REMOVER_CLIENT_HISTORY,
        payload: data,
    };
};

export const movieLike = function (data) {
    return async function (dispatch) {
        try {
            await axios.post("/index/like-movies", data, headers);
        } catch (err) {
            console.log(err);
        }
    };
};

export const getAllLikeMovies = function () {
    return async function (dispatch) {
        try {
            const getLikedMoviesRef = await axios.get("/index/get-all-liked-moves", headers);

            dispatch({
                type: ACTION_TYPE.GET_ALL_LIKE_MOVIES,
                payload: getLikedMoviesRef.data.moviesLikedObject,
            });
        } catch (err) {
            console.log(err);
        }
    };
};
