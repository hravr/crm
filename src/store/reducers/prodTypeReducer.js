import {
  ADD_PROD,
  DELETE_PROD,
  SET_FILTERED_PROD,
  SET_PROD,
} from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD:
      return {
        ...state,
        prod: action.prod,
      };
    case SET_FILTERED_PROD:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD:
      return {
        ...state,
        prod: [...state.prod, action.prod],
      };
    case DELETE_PROD:
      return {
        ...state,
        prod: state.prod.filter((prod) => prod._id !== action._id),
      };
    default:
      return state;
  }
};
