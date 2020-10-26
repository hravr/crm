import { SET_MACHINE } from "../../actions/actionTypes";

const initialState = {
  machines: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE:
      return {
        ...state,
        machines: action.machines,
      };

    default:
      return state;
  }
};
