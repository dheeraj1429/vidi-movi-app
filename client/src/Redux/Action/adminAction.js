import ACTION_TYPE from "../ActionType/ActionType";
import axios from "axios";
import { headers } from "./headers";

export const movieUpload = function (data) {
    return async function (dispatch) {
        try {
            const config = {
                onUploadProgress: function (progressEvent) {
                    const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    dispatch({
                        type: ACTION_TYPE.UPLOAD_PROGRESSS,
                        payload: percentCompleted,
                    });
                },
            };

            const movieRef = await axios.post("/admin/movie-upload", data, config, headers);

            dispatch({
                type: ACTION_TYPE.MOVIE_UPLOAD,
                payload: movieRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const loadingAction = function (data) {
    return {
        type: ACTION_TYPE.LOADING_SPNNER,
        payload: data,
    };
};

export const updateUserProfile = function (data) {
    return async function (dispatch) {
        try {
            const userRef = await axios.put("/admin/update-user-profile", data, headers);

            dispatch({
                type: ACTION_TYPE.GET_ALL_USERS,
                payload: userRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const deleteAccount = function (data) {
    return async function (dispatch) {
        try {
            const delteAccountRef = await axios.post("/admin/delete-account", data, headers);
            dispatch({
                type: ACTION_TYPE.GET_ALL_USERS,
                payload: delteAccountRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const getAllUsers = function () {
    return async function (dispatch) {
        try {
            const getAllUserFromDb = await axios.get("/admin/get-all-users", headers);

            dispatch({
                type: ACTION_TYPE.GET_ALL_USERS,
                payload: getAllUserFromDb.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};
