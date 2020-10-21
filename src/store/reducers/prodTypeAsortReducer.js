import {
  ADD_PROD_ASORTUMENT,
  DELETE_PROD_ASORTUMENT,
  SET_FILTERED_PROD_ASORTUMENT,
  SET_PROD_ASORTUMENT,
} from "../actions/actionTypes";

const initialState = {
  prodAsortument: [],

  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_ASORTUMENT:
      return {
        ...state,
        prodAsortument: action.prodAsortument,
      };
    case SET_FILTERED_PROD_ASORTUMENT:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD_ASORTUMENT:
      return {
        ...state,
        prodAsortument: [...state.prodAsortument, action.prodAsortument],
      };
    case DELETE_PROD_ASORTUMENT:
      return {
        ...state,
        prodAsortument: state.prodAsortument.filter(
          (prodAsortument) => prodAsortument._id !== action._id
        ),
      };
    default:
      return state;
  }
};
