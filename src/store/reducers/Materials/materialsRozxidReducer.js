import {
  ADD_ZVITU_ROZXID,
  DELETE_ZVITU_ROZXID,
  SET_FILTERED_ZVITU_ROZXID,
  SET_SINGLE_ZVITU_ROZXID,
  SET_ZVITU_ROZXID,
} from "../../actions/actionTypes";

const initialState = {
  zvituRozxid: "",
  filtered: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZVITU_ROZXID:
      return {
        ...state,
        zvituRozxid: action.zvituRozxid,
      };
    case SET_SINGLE_ZVITU_ROZXID:
      return { ...state, single: action.singleZvituRozxid };
    case ADD_ZVITU_ROZXID:
      return {
        ...state,
        zvituRozxid: [...state.zvituRozxid, action.zvituRozxid],
      };
    case SET_FILTERED_ZVITU_ROZXID:
      return {
        ...state,
        filtered: action.filtered,
      };
    case DELETE_ZVITU_ROZXID:
      return {
        ...state,
        zvituRozxid: state.zvituRozxid.filter(
          (zvituRozxid) => zvituRozxid._id !== action._id
        ),
      };

    default:
      return state;
  }
};
