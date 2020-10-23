import {
  ADD_PRAJA_TYPE,
  DELETE_PRAJA_TYPE,
  SET_FILTER_PRAJA_TYPE,
  SET_PRAJA_TYPE,
} from "../../actions/actionTypes";

const initialState = {
  prajaType: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_TYPE:
      return {
        ...state,
        prajaType: action.prajaType,
      };
    case SET_FILTER_PRAJA_TYPE:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PRAJA_TYPE:
      return {
        ...state,
        prajaType: [...state.prajaType, action.prajaType],
      };
    case DELETE_PRAJA_TYPE:
      return {
        ...state,
        prajaType: state.prajaType.filter(
          (prajaType) => prajaType._id !== action._id
        ),
      };
    default:
      return state;
  }
};
