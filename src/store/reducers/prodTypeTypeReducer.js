import {
  ADD_PROD_TYPE,
  DELETE_PROD_TYPE,
  SET_FILTERED_PROD_TYPE,
  SET_PROD_TYPE,
} from "../actions/actionTypes";

const initialState = {
  prodType: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_TYPE:
      return {
        ...state,
        prodType: action.prodType,
      };
    case SET_FILTERED_PROD_TYPE:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD_TYPE:
      return {
        ...state,
        prodType: [...state.prodType, action.prodType],
      };
    case DELETE_PROD_TYPE:
      return {
        ...state,
        prodType: state.prodType.filter(
          (prodType) => prodType._id !== action.id
        ),
      };
    default:
      return state;
  }
};
