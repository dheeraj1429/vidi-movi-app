import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReduer from "./authReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReduer,
});

export default rootReducer;
