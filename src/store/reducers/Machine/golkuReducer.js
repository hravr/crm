import {
  ADD_MACHINE_GOLKU,
  DELETE_MACHINE_GOLKU,
  SET_FILTER_MACHINE_GOLKU,
  SET_MACHINE_GOLKU,
} from "../../actions/actionTypes";

const initialState = {
  machineGolku: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE_GOLKU:
      return {
        ...state,
        machineGolku: action.machineGolku,
      };
    case SET_FILTER_MACHINE_GOLKU:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MACHINE_GOLKU:
      return {
        ...state,
        machineGolku: [...state.machineGolku, action.machineGolku],
      };
    case DELETE_MACHINE_GOLKU:
      return {
        ...state,
        machineGolku: state.machineGolku.filter(
          (machineGolku) => machineGolku._id !== action._id
        ),
      };
    default:
      return state;
  }
};
