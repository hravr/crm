import {
  ADD_SKLAD3,
  DELETE_SKLAD3,
  SET_FILTERED_ROZXOD_SKLAD3,
  SET_FILTERED_SKLAD3,
  SET_SINGLE_SKLAD3,
  SET_SKLAD1_ZALUSHOK,
  SET_SKLAD3,
  SET_SKLAD3_ZALUSHOK,
} from "../actions/actionTypes";

const initialState = {
  sklad3: "",
  filtered: [],
  filteredRozxod: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKLAD3:
      return {
        ...state,
        sklad3: action.sklad3,
      };
    case SET_SINGLE_SKLAD3:
      return { ...state, single: action.singleSklad3 };
    case SET_FILTERED_SKLAD3:
      return {
        ...state,
        filtered: action.filtered,
      };
    case SET_FILTERED_ROZXOD_SKLAD3:
      return {
        ...state,
        filteredRozxod: action.filteredRozxod,
      };
    case ADD_SKLAD3:
      return {
        ...state,
        sklad3: [...state.sklad3, action.sklad3],
      };
    case DELETE_SKLAD3:
      return {
        ...state,
        sklad3: state.sklad3.filter((sklad3) => sklad3._id !== action.id),
      };
    case SET_SKLAD3_ZALUSHOK:
      return {
        ...state,
        sklad1_zalushok: action.sklad1_zalushok,
      };
    default:
      return state;
  }
};
