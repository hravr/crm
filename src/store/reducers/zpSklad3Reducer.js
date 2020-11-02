import { SET_ZP_SKLAD3 } from "../actions/actionTypes";

const initialState = {
  zpsklad3: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZP_SKLAD3:
      return {
        ...state,
        zpsklad3: action.zpsklad3,
      };
    default:
      return state;
  }
};
