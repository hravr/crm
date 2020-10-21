import { SET_MATERIALS_VENDOR } from "../../actions/actionTypes";

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
    default:
      return state;
  }
};
