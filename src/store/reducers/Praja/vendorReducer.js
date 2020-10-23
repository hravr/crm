import {
  ADD_PRAJA_VENDOR,
  DELETE_PRAJA_VENDOR,
  SET_FILTER_PRAJA_VENDOR,
  SET_PRAJA_VENDOR,
} from "../../actions/actionTypes";

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
    case SET_FILTER_PRAJA_VENDOR:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PRAJA_VENDOR:
      return {
        ...state,
        prajaVendor: [...state.prajaVendor, action.prajaVendor],
      };
    case DELETE_PRAJA_VENDOR:
      return {
        ...state,
        prajaVendor: state.prajaVendor.filter(
          (prajaVendor) => prajaVendor._id !== action._id
        ),
      };
    default:
      return state;
  }
};
