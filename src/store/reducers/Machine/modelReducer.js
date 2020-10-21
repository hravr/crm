import { SET_MACHINE_MODEL} from "../../actions/actionTypes";

const initialState = {
  machineModel: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE_MODEL:
      return {
        ...state,
        machineModel: action.machineModel,
      };
    default:
      return state;
  }
};
