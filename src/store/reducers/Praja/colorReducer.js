import { SET_PRAJA_COLOR } from "../../actions/actionTypes";

const initialState = {
  prajaColor: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_COLOR:
      return {
        ...state,
        prajaColor: action.prajaColor,
      };
    default:
      return state;
  }
};
