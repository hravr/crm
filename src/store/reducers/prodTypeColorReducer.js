import {
  ADD_PROD_COLOR,
  DELETE_PROD_COLOR,
  SET_FILTERED_PROD_COLOR,
  SET_PROD_COLOR,
} from "../actions/actionTypes";

const initialState = {
  prodColor: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_COLOR:
      return {
        ...state,
        prodColor: action.prodColor,
      };
    case SET_FILTERED_PROD_COLOR:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD_COLOR:
      return {
        ...state,
        prodColor: [...state.prodColor, action.prodColor],
      };
    case DELETE_PROD_COLOR:
      return {
        ...state,
        prodColor: state.prodColor.filter(
          (prodColor) => prodColor._id !== action.id
        ),
      };
    default:
      return state;
  }
};
