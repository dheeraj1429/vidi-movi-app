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
