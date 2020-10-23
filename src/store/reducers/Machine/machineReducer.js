import { SET_MACHINE } from "../../actions/actionTypes";

const initialState = {
  machine: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE:
      return {
        ...state,
        machine: action.machine,
      };

    default:
      return state;
  }
};
