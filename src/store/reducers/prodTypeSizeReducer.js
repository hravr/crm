import {
  ADD_PROD_SIZE,
  DELETE_PROD_SIZE,
  SET_FILTERED_PROD_SIZE,
  SET_PROD_SIZE,
} from "../actions/actionTypes";

const initialState = {
  prodSize: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_SIZE:
      return {
        ...state,
        prodSize: action.prodSize,
      };
    case SET_FILTERED_PROD_SIZE:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD_SIZE:
      return {
        ...state,
        prodSize: [...state.prodSize, action.prodSize],
      };
    case DELETE_PROD_SIZE:
      return {
        ...state,
        prodSize: state.prodSize.filter(
          (prodSize) => prodSize._id !== action.id
        ),
      };
    default:
      return state;
  }
};
