import {
  ADD_PROD_SEZON,
  DELETE_PROD_SEZON,
  SET_FILTERED_PROD_SEZON,
  SET_PROD_SEZON,
} from "../actions/actionTypes";

const initialState = {
  prodSezon: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_SEZON:
      return {
        ...state,
        prodSezon: action.prodSezon,
      };
    case SET_FILTERED_PROD_SEZON:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD_SEZON:
      return {
        ...state,
        prodSezon: [...state.prodSezon, action.prodSezon],
      };
    case DELETE_PROD_SEZON:
      return {
        ...state,
        prodSezon: state.prodSezon.filter(
          (prodSezon) => prodSezon._id !== action.id
        ),
      };
    default:
      return state;
  }
};
