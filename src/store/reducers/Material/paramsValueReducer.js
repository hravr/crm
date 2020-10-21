import { SET_MATERIALS_PARAMS_VALUE } from "../../actions/actionTypes";

const initialState = {
  materialParamsValue: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS_PARAMS_VALUE:
      return {
        ...state,
        materialParamsValue: action.materialParamsValue,
      };
    default:
      return state;
  }
};
