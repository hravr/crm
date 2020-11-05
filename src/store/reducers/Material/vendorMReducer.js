import {
  ADD_MATERIALS_VENDOR,
  DELETE_MATERIALS_VENDOR,
  SET_FILTER_MATERIALS_VENDOR,
  SET_MATERIALS_VENDOR,
} from "../../actions/actionTypes";

const initialState = {
  materialVendor: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS_VENDOR:
      return {
        ...state,
        materialVendor: action.materialVendor,
      };
    case SET_FILTER_MATERIALS_VENDOR:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MATERIALS_VENDOR:
      return {
        ...state,
        materialVendor: [...state.materialVendor, action.materialVendor],
      };
    case DELETE_MATERIALS_VENDOR:
      return {
        ...state,
        materialVendor: state.materialVendor.filter(
          (materialVendor) => materialVendor._id !== action.id
        ),
      };
    default:
      return state;
  }
};
