import {
  ADD_ZVITU,
  DELETE_ZVITU,
  SET_FILTERED_ZVITU,
  SET_SINGLE_ZVITU,
  SET_ZVITU,
} from "../../actions/actionTypes";

const initialState = {
  zvitu: "",
  filtered: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZVITU:
      return {
        ...state,
        zvitu: action.zvitu,
      };
    case SET_SINGLE_ZVITU:
      return { ...state, single: action.singleZvitu };
    case ADD_ZVITU:
      return {
        ...state,
        zvitu: [...state.zvitu, action.zvitu],
      };
    case SET_FILTERED_ZVITU:
      return {
        ...state,
        filtered: action.filtered,
      };
    case DELETE_ZVITU:
      return {
        ...state,
        zvitu: state.zvitu.filter((zvitu) => zvitu._id !== action.id),
      };

    default:
      return state;
  }
};
