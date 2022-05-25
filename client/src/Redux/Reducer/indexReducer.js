import ACTION_TYPE from "../ActionType/ActionType";

const INITAL_STATE = {
    all_movies: null,
    overlay: false,
};

const indexReducer = function (state = INITAL_STATE, action) {
    switch (action.type) {
        case ACTION_TYPE.GET_ALL_MOVIES:
            return {
                ...state,
                all_movies: action.payload,
            };

        case ACTION_TYPE.OVER_LAY_DIV:
            return {
                ...state,
                overlay: action.payload,
            };

        default: {
            return {
                ...state,
            };
        }
    }
};

export default indexReducer;
