import { combineReducers } from "redux";
import profilleReducer from "./profileReducer";

export default combineReducers({
  profile: profilleReducer,
});
