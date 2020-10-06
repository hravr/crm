import { combineReducers } from "redux";
import profilleReducer from "./profileReducer";
import skladReducer from "./skladReducer";

export default combineReducers({
  profile: profilleReducer,
  sklad1: skladReducer,
});
