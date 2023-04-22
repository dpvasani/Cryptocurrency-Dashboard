import { combineReducers } from "redux";
import defaultReducer from "./defaultReducer";
import exchangeReducer from "./exchangeReducer";

const rootReducer = combineReducers ({
    default : defaultReducer,
    exchange : exchangeReducer    
})


export default rootReducer