import {
  ADD_ZP_SKLAD1,
  DELETE_ZP_SKLAD1,
  SET_FILTERED_ZP_SKLAD1,
  SET_ZP_SKLAD1,
} from "../actions/actionTypes";

const initialState = {
  zp_sklad1: "",
  filtered: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ZP_SKLAD1:
      return {
        ...state,
        zp_sklad1: action.zp_sklad1,
      };
    case SET_FILTERED_ZP_SKLAD1:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_ZP_SKLAD1:
      return {
        ...state,
        zp_sklad1: [...state.zp_sklad1, action.zp_sklad1],
      };
    case DELETE_ZP_SKLAD1:
      return {
        ...state,
        zp_sklad1: state.zp_sklad1.filter(
          (zp_sklad1) => zp_sklad1._id !== action._id
        ),
      };
    default:
      return state;
  }
};
