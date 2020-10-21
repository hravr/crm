import { SET_MATERIALS_PARAMS } from "../../actions/actionTypes";

const initialState = {
  materialParams: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS_PARAMS:
      return {
        ...state,
        materialParams: action.materialParams,
      };
    default:
      return state;
  }
};
