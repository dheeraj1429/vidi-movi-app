import ACTION_TYPE from "../ActionType/ActionType";
import axios from "axios";
import { headers } from "./headers";

export const getAllMovies = function () {
    return async function (dispatch) {
        try {
            const moviesRef = await axios.post("/index/get-all-movies", headers);

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
