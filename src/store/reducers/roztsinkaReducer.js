import {
  ADD_ROZTSINKA,
  DELETE_ROZTSINKA,
  SET_FILTER_ROZTSINKA,
  SET_ROZTSINKA,
} from "../actions/actionTypes";

const initialState = {
  roztsinka: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROZTSINKA:
      return {
        ...state,
        roztsinka: action.roztsinka,
      };
    case SET_FILTER_ROZTSINKA:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_ROZTSINKA:
      return {
        ...state,
        roztsinka: [...state.roztsinka, action.roztsinka],
      };
    case DELETE_ROZTSINKA:
      return {
        ...state,
        roztsinka: state.roztsinka.filter(
          (roztsinka) => roztsinka._id !== action._id
        ),
      };
    default:
      return state;
  }
};
