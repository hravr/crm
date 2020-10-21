import { SET_ROZTSINKA } from "../actions/actionTypes";

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
    default:
      return state;
  }
};
