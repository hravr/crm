import {
  ADD_WORKER,
  DELETE_WORKER,
  SET_FILTERED_WORKERS,
  SET_SINGLE_WORKER,
  SET_WORKERS,
} from "../actions/actionTypes";

const initialState = {
  workers: [],
  single: {},
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKERS:
      return {
        ...state,
        workers: action.workers,
      };
    case SET_SINGLE_WORKER:
      return { ...state, single: action.singleWorker };
    case SET_FILTERED_WORKERS:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_WORKER:
      return {
        ...state,
        workers: [...state.workers, action.workers],
      };
    case DELETE_WORKER:
      return {
        ...state,
        workers: state.workers.filter((workers) => workers._id !== action.id),
      };
    default:
      return state;
  }
};
