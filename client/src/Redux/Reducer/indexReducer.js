import ACTION_TYPE from "../ActionType/ActionType";

const INITAL_STATE = {
    all_movies: null,
    overlay: false,
    showPopUp: false,
    showOptionsPopUp: false,
    changeTheme: "dark",
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

        case ACTION_TYPE.TOGGLE_POPUP:
            return {
                ...state,
                showPopUp: action.payload,
            };

        case ACTION_TYPE.SHOW_OPTIONS_POPUP:
            return {
                ...state,
                showOptionsPopUp: action.payload,
            };

        case ACTION_TYPE.CHANGE_THEME:
            return {
                ...state,
                changeTheme: action.payload,
            };

        default: {
            return {
                ...state,
            };
        }
    }
};

export default indexReducer;
