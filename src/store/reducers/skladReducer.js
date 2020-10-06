import {
  ADD_SKLAD1,
  DELETE_SKLAD1,
  SET_FILTERED_SKLAD1,
  SET_SEARCH_VALUE,
  SET_SKLAD1,
} from "../actions/actionTypes";

const initialState = {
  // sklad1: [],
  // filtered: [],
  // searchValue: "",
  vyazalId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKLAD1:
      return {
        ...state,
        sklad1: action.sklad1,
      };
    case SET_FILTERED_SKLAD1:
      return {
        ...state,
        filtered: action.sklad1,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    case ADD_SKLAD1:
      return {
        ...state,
        sklad1: [...state.sklad1, action.sklad1],
      };
    case DELETE_SKLAD1:
      return {
        ...state,
        sklad1: state.sklad1.filter((sklad1) => sklad1._id !== action._id),
      };
    default:
      return state;
  }
};
