import { SET_ZP_SKLAD4 } from "../actions/actionTypes";

const initialState = {
  zpsklad4: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZP_SKLAD4:
      return {
        ...state,
        zpsklad4: action.zpsklad4,
      };
    default:
      return state;
  }
};
