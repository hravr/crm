import { SET_PRAJA_VENDOR } from "../../actions/actionTypes";

const initialState = {
  prajaVendor: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_VENDOR:
      return {
        ...state,
        prajaVendor: action.prajaVendor,
      };
    default:
      return state;
  }
};
