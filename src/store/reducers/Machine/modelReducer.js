import {
  ADD_MACHINE_MODEL,
  DELETE_MACHINE_MODEL,
  SET_FILTER_MACHINE_MODEL,
  SET_MACHINE_MODEL,
} from "../../actions/actionTypes";

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
    case SET_FILTER_MACHINE_MODEL:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MACHINE_MODEL:
      return {
        ...state,
        machineModel: [...state.machineModel, action.machineModel],
      };
    case DELETE_MACHINE_MODEL:
      return {
        ...state,
        machineModel: state.machineModel.filter(
          (machineModel) => machineModel._id !== action.id
        ),
      };
    default:
      return state;
  }
};
