import {
  ADD_SKLAD2,
  DELETE_SKLAD2,
  SET_FILTERED_SKLAD2,
  SET_SINGLE_SKLAD2,
  SET_SKLAD2,
} from "../actions/actionTypes";

const initialState = {
  sklad2: "",
  filtered: [],single: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKLAD2:
      return {
        ...state,
        sklad2: action.sklad2,
      };
      case SET_SINGLE_SKLAD2:
        return { ...state, single: action.singleSklad2 };
    case SET_FILTERED_SKLAD2:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_SKLAD2:
      return {
        ...state,
        sklad2: [...state.sklad2, action.sklad2],
      };
    case DELETE_SKLAD2:
      return {
        ...state,
        sklad2: state.sklad2.filter((sklad2) => sklad2._id !== action._id),
      };
    default:
      return state;
  }
};
