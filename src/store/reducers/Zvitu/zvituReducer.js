import {
  DELETE_ZVITU,
  SET_FILTERED_ZVITU,
  SET_ZVITU,
} from "../../actions/actionTypes";

const initialState = {
  zvitu: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZVITU:
      return {
        ...state,
        zvitu: action.zvitu,
      };
    case SET_FILTERED_ZVITU:
      return {
        ...state,
        filtered: action.filtered,
      };
    case DELETE_ZVITU:
      return {
        ...state,
        zvitu: state.zvitu.filter((zvitu) => zvitu._id !== action._id),
      };
    default:
      return state;
  }
};
