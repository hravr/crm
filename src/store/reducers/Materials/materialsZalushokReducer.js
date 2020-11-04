import {
  SET_FILTERED_ZVITU_ZALUSHOK,
  SET_ZVITU_ZALUSHOK,
} from "../../actions/actionTypes";

const initialState = {
  zvituZalushok: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZVITU_ZALUSHOK:
      return {
        ...state,
        zvituZalushok: action.zvituZalushok,
      };
    case SET_FILTERED_ZVITU_ZALUSHOK:
      return {
        ...state,
        filtered: action.filtered,
      };
    default:
      return state;
  }
};
