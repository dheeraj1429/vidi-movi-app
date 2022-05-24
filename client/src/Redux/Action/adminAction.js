import ACTION_TYPE from "../ActionType/ActionType";
import axios from "axios";
import { headers } from "./headers";

export const movieUpload = function (data) {
    return async function (dispatch) {
        try {
            const movieRef = await axios.post("/admin/movie-upload", data, headers);

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
