import { SET_MACHINE_VYAZALNI } from "../../actions/actionTypes";

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
    default:
      return state;
  }
};
