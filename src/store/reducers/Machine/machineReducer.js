import {
  ADD_MACHINE,
  DELETE_MACHINE,
  SET_FILTER_MACHINE,
  SET_MACHINE,
  SET_SINGLE_MACHINE,
} from "../../actions/actionTypes";

const initialState = {
  machines: [],
  single: {},
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE:
      return {
        ...state,
        machines: action.machines,
      };
    case SET_SINGLE_MACHINE:
      return { ...state, single: action.singleMachine };
    case SET_FILTER_MACHINE:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MACHINE:
      return {
        ...state,
        machines: [...state.machines, action.machines],
      };
    case DELETE_MACHINE:
      return {
        ...state,
        machines: state.machines.filter(
          (machines) => machines._id !== action.id
        ),
      };
    default:
      return state;
  }
};
