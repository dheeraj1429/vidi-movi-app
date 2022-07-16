import ACTION_TYPE from "../ActionType/ActionType";
import axios from "axios";
import { headers } from "./headers";

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

export const logInUser = function (data) {
    return async function (dispatch) {
        try {
            const logInUserRef = await axios.post("/auth/logIn", data, headers);

            dispatch({
                type: ACTION_TYPE.USER_SIGN_IN,
                payload: logInUserRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const forgetPassword = function (data) {
    return async function (dispatch) {
        try {
            const userForgetRef = await axios.post("/auth/forget-password", data, headers);

            console.log(userForgetRef);

            dispatch({
                type: ACTION_TYPE.USER_SIGN_IN,
                payload: userForgetRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const userForgetPasswordRequiest = function (data) {
    console.log(data);

    return async function (dispatch) {
        try {
            const forgetPasswordRef = await axios.post("/auth/user/forget-request", data, headers);

            dispatch({
                type: ACTION_TYPE.FORGET_PASSWORD_REQUIEST,
                payload: forgetPasswordRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export const forgetResetError = function (data) {
    return {
        type: ACTION_TYPE.USER_SIGN_IN,
        payload: data,
    };
};

export const signInWithGoogle = function (data) {
    return async function (dispatch) {
        try {
            const googleRef = await axios.post("/auth/google/log-in", data, headers);

            dispatch({
                type: ACTION_TYPE.SIGN_WITH_GOOGLE,
                payload: googleRef.data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};
