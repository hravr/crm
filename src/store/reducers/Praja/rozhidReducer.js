import {
  ADD_PRAJA_ROZHID,
  DELETE_PRAJA_ROZHID,
  SET_FILTER_PRAJA_ROZHID,
  SET_PRAJA_ROZHID,
} from "../../actions/actionTypes";

const initialState = {
  prajaRozhid: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_ROZHID:
      return {
        ...state,
        prajaRozhid: action.prajaRozhid,
      };
    case SET_FILTER_PRAJA_ROZHID:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PRAJA_ROZHID:
      return {
        ...state,
        prajaRozhid: [...state.prajaRozhid, action.prajaRozhid],
      };
    case DELETE_PRAJA_ROZHID:
      return {
        ...state,
        prajaRozhid: state.prajaRozhid.filter(
          (prajaRozhid) => prajaRozhid._id !== action._id
        ),
      };
    default:
      return state;
  }
};
