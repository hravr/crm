import {
  ADD_SKLAD4,
  DELETE_SKLAD4,
  SET_FILTERED_SKLAD4,
  SET_SKLAD4,
} from "../actions/actionTypes";

const initialState = {
  sklad4: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKLAD4:
      return {
        ...state,
        sklad4: action.sklad4,
      };
    case SET_FILTERED_SKLAD4:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_SKLAD4:
      return {
        ...state,
        sklad4: [...state.sklad4, action.sklad4],
      };
    case DELETE_SKLAD4:
      return {
        ...state,
        sklad4: state.sklad4.filter((sklad4) => sklad4._id !== action._id),
      };
    default:
      return state;
  }
};
