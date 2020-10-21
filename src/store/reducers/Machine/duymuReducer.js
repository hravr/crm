import { SET_MACHINE_DYUMU } from "../../actions/actionTypes";

const initialState = {
  machineDuymu: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE_DYUMU:
      return {
        ...state,
        machineDuymu: action.machineDuymu,
      };
    default:
      return state;
  }
};
