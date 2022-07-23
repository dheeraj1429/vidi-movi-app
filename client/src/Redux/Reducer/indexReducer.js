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
    allUsers: null,
    userProfilePopUp: false,
    userProfileSelected: null,
    isPLayListSave: null,
    userAllVideoPlayList: null,
    MoviesIsLiked: null,
    MovieLike: false,
    searchData: null,
    allSearchMoviesData: null,
    loadingMovies: true,
    movieIsLiked: false,
    showSelectedOptions: false,
    storeSelectedMoviesId: [],
    movieComments: null,
    loadingCommentSendButton: false,
    currentMovieComment: [],
    showReportComponent: null,
    commentReport: null,
    commentReportLoading: false,
};

const indexReducer = function (state = INITAL_STATE, action) {
    switch (action.type) {
        case ACTION_TYPE.GET_ALL_MOVIES:
            return {
                ...state,
                all_movies: action.payload,
            };

        case ACTION_TYPE.GET_MOVIES_IN_SCROLL:
            return {
                ...state,
                all_movies: {
                    success: true,
                    allMoviesDataCollection: state.all_movies.allMoviesDataCollection.concat(
                        action.payload.data
                    ),
                },
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
            const findHistory = state.userHistory.filter(
                (el) => el.moviesId._id !== action.payload
            );

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

        case ACTION_TYPE.REMOVER_LIKE_VIDEO:
            const filterLikeMovies = state.userLikedVideos.filter(
                (el) => el._id !== action.payload
            );
            return {
                ...state,
                userLikedVideos: filterLikeMovies,
            };

        case ACTION_TYPE.GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload,
            };

        case ACTION_TYPE.USER_PROFILE_POPUP:
            return {
                ...state,
                userProfilePopUp: action.payload,
            };

        case ACTION_TYPE.USER_PROFILE_SELECTED:
            return {
                ...state,
                userProfileSelected: action.payload,
            };

        case ACTION_TYPE.USER_VIDEO_IN_PLAYLIST:
            return {
                ...state,
                isPLayListSave: action.payload,
            };

        case ACTION_TYPE.USER_ALL_VIDEO_PLAYLIST:
            return {
                ...state,
                userAllVideoPlayList: action.payload,
            };

        case ACTION_TYPE.MOVIS_IS_LIKED:
            return {
                ...state,
                MoviesIsLiked: action.payload,
                MovieLike: action.payload.success,
            };

        case ACTION_TYPE.SEARCH_MOVIE_IN_DB:
            return {
                ...state,
                searchData: action.payload,
            };

        case ACTION_TYPE.GET_ALL_SEARCH_MOVIES:
            return {
                ...state,
                allSearchMoviesData: action.payload,
                loadingMovies: false,
            };

        case ACTION_TYPE.LOADING_SEARCH_MOVIES:
            return {
                ...state,
                loadingMovies: action.payload,
            };

        case ACTION_TYPE.DELETE_ALL_USER_HISTORY:
            return {
                ...state,
                userHistory: action.payload,
            };

        case ACTION_TYPE.SHOW_SELECTE_OPTIONS:
            return {
                ...state,
                showSelectedOptions: action.payload,
            };

        case ACTION_TYPE.STORE_SELECTED_MOVIES_ID:
            return {
                ...state,
                storeSelectedMoviesId: state.storeSelectedMoviesId.concat(action.payload),
            };

        case ACTION_TYPE.REMOVE_SELECTED_MOVIES_ID:
            return {
                ...state,
                storeSelectedMoviesId: state.storeSelectedMoviesId.filter(
                    (el) => el !== action.payload
                ),
            };

        case ACTION_TYPE.REMOVE_ALL_SELECTED_MOVIES_FROM_HISTORY:
            const set = new Set(action.payload);
            return {
                ...state,
                userHistory: state.userHistory.filter(
                    (el) => (el.moviesId._id = !set.has(el.moviesId._id))
                ),
            };

        case ACTION_TYPE.GET_MOVIES_COMMENTS:
            return {
                ...state,
                movieComments: action.payload,
            };

        case ACTION_TYPE.REMOVE_ALL_COMMENTS:
            return {
                ...state,
                movieComments: action.payload,
                currentMovieComment: [],
            };

        case ACTION_TYPE.SEND_MOVIE_COMMENTS:
            return {
                ...state,
                currentMovieComment: [action.payload, ...state.currentMovieComment],
                loadingCommentSendButton: false,
            };

        case ACTION_TYPE.SEND_LOADING_COMMENT_BUTTON:
            return {
                ...state,
                loadingCommentSendButton: action.payload,
            };

        case ACTION_TYPE.SHOW_REPORT_COMPONENT:
            return {
                ...state,
                showReportComponent: action.payload,
            };

        case ACTION_TYPE.MOVIE_COMMENT_REPORT:
            return {
                ...state,
                commentReport: action.payload,
                commentReportLoading: false,
            };

        case ACTION_TYPE.REPORT_LOADING_COMMENT:
            return {
                ...state,
                commentReportLoading: action.payload,
            };

        case ACTION_TYPE.REMOVE_REPORT_MESSAGE:
            return {
                ...state,
                commentReport: action.payload,
            };

        default: {
            return {
                ...state,
            };
        }
    }
};

export default indexReducer;
