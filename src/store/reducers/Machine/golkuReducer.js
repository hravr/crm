import { SET_MACHINE_GOLKU } from "../../actions/actionTypes";

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
    default:
      return state;
  }
};
