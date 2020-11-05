import {
  SET_FILTERED_MATERIALS_ZALUSHOK,
  SET_MATERIALS_ZALUSHOK,
} from "../../actions/actionTypes";

const initialState = {
  zvituZalushok: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS_ZALUSHOK:
      return {
        ...state,
        zvituZalushok: action.zvituZalushok,
      };
    case SET_FILTERED_MATERIALS_ZALUSHOK:
      return {
        ...state,
        filtered: action.filtered,
      };
    default:
      return state;
  }
};
