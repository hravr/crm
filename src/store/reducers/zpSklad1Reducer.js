import { SET_ZP_SKLAD1 } from "../actions/actionTypes";

const initialState = {
  zpsklad1: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZP_SKLAD1:
      return {
        ...state,
        zpsklad1: action.zpsklad1,
      };
    default:
      return state;
  }
};
