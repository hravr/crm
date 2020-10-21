import { SET_PRAJA_TYPE } from "../../actions/actionTypes";

const initialState = {
  prajaType: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_TYPE:
      return {
        ...state,
        prajaType: action.prajaType,
      };
    default:
      return state;
  }
};
