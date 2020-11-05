import {
  ADD_SKLAD4,
  DELETE_SKLAD4,
  SET_FILTERED_ROZXOD_SKLAD3,
  SET_FILTERED_ROZXOD_SKLAD4,
  SET_FILTERED_SKLAD4,
  SET_SINGLE_SKLAD4,
  SET_SKLAD3_ZALUSHOK,
  SET_SKLAD4,
  SET_SKLAD4_ZALUSHOK,
} from "../actions/actionTypes";

const initialState = {
  sklad4: "",
  filtered: [],
  filteredRozxod: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKLAD4:
      return {
        ...state,
        sklad4: action.sklad4,
      };
    case SET_SINGLE_SKLAD4:
      return { ...state, single: action.singleSklad4 };
    case SET_FILTERED_SKLAD4:
      return {
        ...state,
        filtered: action.filtered,
      };
    case SET_FILTERED_ROZXOD_SKLAD4:
      return {
        ...state,
        filteredRozxod: action.filteredRozxod,
      };
    case ADD_SKLAD4:
      return {
        ...state,
        sklad4: [...state.sklad4, action.sklad4],
      };
    case DELETE_SKLAD4:
      return {
        ...state,
        sklad4: state.sklad4.filter((sklad4) => sklad4._id !== action.id),
      };
    case SET_SKLAD4_ZALUSHOK:
      return {
        ...state,
        sklad1_zalushok: action.sklad1_zalushok,
      };
    default:
      return state;
  }
};
