import {
  SET_FILTERED_PRIAGA_ZALUSHOK,
  SET_PRIAGA_ZALUSHOK
} from "../../actions/actionTypes";

const initialState = {
  zvituZalushok: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRIAGA_ZALUSHOK:
      return {
        ...state,
        zvituZalushok: action.zvituZalushok,
      };
    case SET_FILTERED_PRIAGA_ZALUSHOK:
      return {
        ...state,
        filtered: action.filtered,
      };
    default:
      return state;
  }
};
