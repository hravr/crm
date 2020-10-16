import { combineReducers } from "redux";
import makeReducer from "./makeReducer";
import prodReducer from "./prodTypeReducer";
import profilleReducer from "./profileReducer";
import skladReducer from "./skladReducer";
import workersReducer from "./workersReducer";
import zpSklad1Reducer from "./zpSklad1Reducer";

export default combineReducers({
  // workers: makeReducer("workers", initialState.workers),
  profile: profilleReducer,
  sklad1: skladReducer,
  workers: workersReducer,
  prod: prodReducer,
  zpsklad1: zpSklad1Reducer,
});
