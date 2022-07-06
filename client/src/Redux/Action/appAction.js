import ACTION_TYPE from "../ActionType/ActionType";

export const overlayDiv = function (data) {
    return {
        type: ACTION_TYPE.OVER_LAY_DIV,
        payload: data,
    };
};

export const togglePopUp = function (data) {
    return {
        type: ACTION_TYPE.TOGGLE_POPUP,
        payload: data,
    };
};

export const showOptionPopup = function (data) {
    return {
        type: ACTION_TYPE.SHOW_OPTIONS_POPUP,
        payload: data,
    };
};

export const themChange = function (data) {
    return {
        type: ACTION_TYPE.CHANGE_THEME,
        payload: data,
    };
};

export const selectedMovies = function (data) {
    return {
        type: ACTION_TYPE.SELECTED_MOVIE,
        payload: data,
    };
};

export const removeClientHistory = function (data) {
    return {
        type: ACTION_TYPE.REMOVER_CLIENT_HISTORY,
        payload: data,
    };
};

export const removerLikeVideoFromClient = function (data) {
    return {
        type: ACTION_TYPE.GET_ALL_LIKE_MOVIES,
        payload: data,
    };
};

export const removeUserLikeVideo = function (data) {
    return {
        type: ACTION_TYPE.REMOVER_LIKE_VIDEO,
        payload: data,
    };
};

export const profileSelected = function (data) {
    return {
        type: ACTION_TYPE.USER_PROFILE_SELECTED,
        payload: data,
    };
};

export const userProfilePupup = function (data) {
    return {
        type: ACTION_TYPE.USER_PROFILE_POPUP,
        payload: data,
    };
};

export const loadingSearchMovies = function (data) {
    return {
        type: ACTION_TYPE.LOADING_SEARCH_MOVIES,
        payload: data,
    };
};

export const showSelectedOptions = function (data) {
    return {
        type: ACTION_TYPE.SHOW_SELECTE_OPTIONS,
        payload: data,
    };
};

export const storeSelectedMoviesId = function (data) {
    return {
        type: ACTION_TYPE.STORE_SELECTED_MOVIES_ID,
        payload: data,
    };
};

export const removeSelectedMoviesId = function (data) {
    return {
        type: ACTION_TYPE.REMOVE_SELECTED_MOVIES_ID,
        payload: data,
    };
};

export const removeMoviesAllComments = function (data) {
    return {
        type: ACTION_TYPE.REMOVE_ALL_COMMENTS,
        payload: data,
    };
};
