import ACTION_TYPE from "../ActionType/ActionType";
import axios from "axios";

const headers = {
    "Content-type": "application/json",
};

export const userSignIn = function (data) {
    return async function (dispatch) {
        try {
            const userRefData = await axios.post("/auth/signIn", data, headers);

            dispatch({
                type: ACTION_TYPE.USER_SIGN_IN,
                payload: userRefData.data,
            });
        } catch (err) {
            dispatch({
                type: ACTION_TYPE.USER_SIGN_IN,
                payload: err.response,
            });
        }
    };
};

export const loadingSpen = function (data) {
    return {
        type: ACTION_TYPE.LOADING_SPNNER,
        payload: data,
    };
};

export const setUserCookieData = function (data) {
    return {
        type: ACTION_TYPE.USER_SIGN_IN,
        payload: data,
    };
};
