import { SET_ZP_SKLAD2 } from "../actions/actionTypes";

const initialState = {
  zpsklad2: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZP_SKLAD2:
      return {
        ...state,
        zpsklad2: action.zpsklad2,
      };
    default:
      return state;
  }
};
