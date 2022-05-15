import ACTION_TYPE from "../ActionType/ActionType";

const INITAL_STATE = {
    loading: false,
    user: null,
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

        default:
            return {
                ...state,
            };
    }
};

export default authReduer;
