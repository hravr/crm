import {
  ADD_OPERATIONS,
  DELETE_OPERATIONS,
  SET_FILTERED_OPERATIONS,
  SET_OPERATIONS,
} from "../actions/actionTypes";

const initialState = {
  operations: [],
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_OPERATIONS:
      return {
        ...state,
        operations: action.operations,
        filtered: action.operations,
      };
    case SET_FILTERED_OPERATIONS:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_OPERATIONS:
      return {
        ...state,
        operations: [...state.operations, action.operations],
      };
    case DELETE_OPERATIONS:
      return {
        ...state,
        operations: state.operations.filter(
          (operations) => operations._id !== action._id
        ),
      };
    default:
      return state;
  }
};
