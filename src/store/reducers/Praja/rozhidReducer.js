import { SET_PRAJA_ROZHID } from "../../actions/actionTypes";

const initialState = {
  prajaRozhid: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_ROZHID:
      return {
        ...state,
        prajaRozhid: action.prajaRozhid,
      };
    default:
      return state;
  }
};
