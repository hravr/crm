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
      console.log(action);
      return {
        ...state,
        operations: state.operations.filter(
          (operation) => operation._id !== action.id
        ),
      };
    default:
      return state;
  }
};
