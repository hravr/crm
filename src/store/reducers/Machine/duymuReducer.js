import {
  ADD_MACHINE_DYUMU,
  DELETE_MACHINE_DYUMU,
  SET_FILTER_MACHINE_DYUMU,
  SET_MACHINE_DYUMU,
} from "../../actions/actionTypes";

const initialState = {
  machineDuymu: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MACHINE_DYUMU:
      return {
        ...state,
        machineDuymu: action.machineDuymu,
      };
    case SET_FILTER_MACHINE_DYUMU:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MACHINE_DYUMU:
      return {
        ...state,
        machineDuymu: [...state.machineDuymu, action.machineDuymu],
      };
    case DELETE_MACHINE_DYUMU:
      return {
        ...state,
        machineDuymu: state.machineDuymu.filter(
          (machineDuymu) => machineDuymu._id !== action._id
        ),
      };
    default:
      return state;
  }
};
