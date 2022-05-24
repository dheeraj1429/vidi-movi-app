import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReduer from "./authReducer";
import movieReducer from "./adminReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReduer,
    movie: movieReducer,
});

export default rootReducer;
