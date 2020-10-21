import { SET_PRAJA_SUROVUNA } from "../../actions/actionTypes";

const initialState = {
  prajaSurovuna: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_SUROVUNA:
      return {
        ...state,
        prajaSurovuna: action.prajaSurovuna,
      };
    default:
      return state;
  }
};
