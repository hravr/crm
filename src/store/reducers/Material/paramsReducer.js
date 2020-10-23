import {
  ADD_MATERIALS_PARAMS,
  DELETE_MATERIALS_PARAMS,
  SET_FILTER_MATERIALS_PARAMS,
  SET_MATERIALS_PARAMS,
} from "../../actions/actionTypes";

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
    case SET_FILTER_MATERIALS_PARAMS:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MATERIALS_PARAMS:
      return {
        ...state,
        materialParams: [...state.materialParams, action.materialParams],
      };
    case DELETE_MATERIALS_PARAMS:
      return {
        ...state,
        materialParams: state.materialParams.filter(
          (materialParams) => materialParams._id !== action._id
        ),
      };
    default:
      return state;
  }
};
