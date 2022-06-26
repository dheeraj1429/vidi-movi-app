import { combineReducers } from "redux";
import authReduer from "./authReducer";
import movieReducer from "./adminReducer";
import indexReducer from "./indexReducer";

const rootReducer = combineReducers({
    auth: authReduer,
    movie: movieReducer,
    index: indexReducer,
});

export default rootReducer;
