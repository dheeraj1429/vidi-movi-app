import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReduer from "./authReducer";
import movieReducer from "./adminReducer";
import indexReducer from "./indexReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReduer,
    movie: movieReducer,
    index: indexReducer,
});

export default rootReducer;
