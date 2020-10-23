import { ADD_PRAJA_COLOR, DELETE_PRAJA_COLOR, SET_FILTER_PRAJA_COLOR, SET_PRAJA_COLOR } from "../../actions/actionTypes";

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
    case SET_FILTER_PRAJA_COLOR:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PRAJA_COLOR:
      return {
        ...state,
        prajaColor: [...state.prajaColor, action.prajaColor],
      };
    case DELETE_PRAJA_COLOR:
      return {
        ...state,
        prajaColor: state.prajaColor.filter(
          (prajaColor) => prajaColor._id !== action._id
        ),
      };
    default:
      return state;
  }
};
