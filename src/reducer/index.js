import { combineReducers } from "redux";
import userReducer from "./useReducer";
import placeReducer from "./placeReducer";

const rootReducer = combineReducers({
    userReducer,
    placeReducer
});

export default rootReducer;
