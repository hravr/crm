import {SET_ZP_REST} from "../actions/actionTypes";

const initialState = {
  zp_rest: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZP_REST:
      return {
        ...state,
        zp_rest: action.zp_rest,
      };
    default:
      return state;
  }
};
