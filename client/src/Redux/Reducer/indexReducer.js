import ACTION_TYPE from "../ActionType/ActionType";

const INITAL_STATE = {
    all_movies: null,
    overlay: false,
    showPopUp: false,
    showOptionsPopUp: false,
    changeTheme: "dark",
    selectedMovie: null,
    playVideo: false,
    userHistory: null,
    loadingHistory: true,
    userLikedVideos: null,
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

        case ACTION_TYPE.SELECTED_MOVIE:
            return {
                ...state,
                selectedMovie: action.payload,
                playVideo: true,
            };

        case ACTION_TYPE.USER_HISTORY:
            return {
                ...state,
                userHistory: action.payload,
                loadingHistory: false,
            };

        case ACTION_TYPE.REMOVER_USER_ONE_HISTORY_MOVIE:
            const findHistory = state.userHistory.filter((el) => el._id !== action.payload);

            return {
                ...state,
                userHistory: findHistory,
            };

        case ACTION_TYPE.REMOVER_CLIENT_HISTORY:
            return {
                ...state,
                userHistory: action.payload,
            };

        case ACTION_TYPE.GET_ALL_LIKE_MOVIES:
            return {
                ...state,
                userLikedVideos: action.payload,
                loadingHistory: false,
            };

        default: {
            return {
                ...state,
            };
        }
    }
};

export default indexReducer;
