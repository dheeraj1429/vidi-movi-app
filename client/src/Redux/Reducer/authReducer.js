import ACTION_TYPE from "../ActionType/ActionType";

const INITAL_STATE = {
    loading: false,
    user: null,
    forgetPassword: null,
};

const authReduer = function (state = INITAL_STATE, action) {
    switch (action.type) {
        case ACTION_TYPE.USER_SIGN_IN:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case ACTION_TYPE.LOADING_SPNNER:
            return {
                ...state,
                loading: action.payload,
            };

        case ACTION_TYPE.FORGET_PASSWORD_REQUIEST:
            return {
                ...state,
                forgetPassword: action.payload,
                loading: false,
            };

        case ACTION_TYPE.SIGN_WITH_GOOGLE:
            return {
                ...state,
                user: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};

export default authReduer;
