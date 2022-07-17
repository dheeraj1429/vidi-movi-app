import ACTION_TYPE from "../ActionType/ActionType";

const INITAL_STATE = {
    movie_status: null,
    loading: false,
    movieUploadProgress: 0,
};

const movieReducer = function (state = INITAL_STATE, action) {
    switch (action.type) {
        case ACTION_TYPE.MOVIE_UPLOAD:
            return {
                ...state,
                movie_status: action.payload,
                loading: false,
            };

        case ACTION_TYPE.LOADING_SPNNER:
            return {
                ...state,
                loading: action.payload,
            };

        case ACTION_TYPE.UPLOAD_PROGRESSS:
            return {
                ...state,
                movieUploadProgress: action.payload,
            };

        default:
            return {
                ...state,
            };
    }
};

export default movieReducer;
