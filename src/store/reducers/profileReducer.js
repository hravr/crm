import { LOGOUT, SET_PROFILE } from "../actions/actionTypes";

const initialState = { email: "", password: "", token: "" };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        token: action.token,
      };
    case LOGOUT: {
      return { initialState };
    }
    default:
      return state;
  }
};
