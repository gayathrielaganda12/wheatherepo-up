// src/reducers/index.js
import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import authReducer from './authReducer'
 
const rootReducer = combineReducers({
  weather: weatherReducer,
  auth: authReducer,

});

export default rootReducer;
