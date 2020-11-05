import {
  ADD_MACHINE_VYAZALNI,
  DELETE_MACHINE_VYAZALNI,
  SET_FILTER_MACHINE_VYAZALNI,
  SET_MACHINE_VYAZALNI,
} from "../../actions/actionTypes";

const initialState = {
  machineVyazalni: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE_VYAZALNI:
      return {
        ...state,
        machineVyazalni: action.machineVyazalni,
      };
    case SET_FILTER_MACHINE_VYAZALNI:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MACHINE_VYAZALNI:
      return {
        ...state,
        machineVyazalni: [...state.machineVyazalni, action.machineVyazalni],
      };
    case DELETE_MACHINE_VYAZALNI:
      return {
        ...state,
        machineVyazalni: state.machineVyazalni.filter(
          (machineVyazalni) => machineVyazalni._id !== action.id
        ),
      };
    default:
      return state;
  }
};
