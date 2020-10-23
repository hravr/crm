import {
  ADD_MATERIALS_PARAMS_VALUE,
  DELETE_MATERIALS_PARAMS_VALUE,
  SET_FILTER_MATERIALS_PARAMS_VALUE,
  SET_MATERIALS_PARAMS_VALUE,
} from "../../actions/actionTypes";

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
    case SET_FILTER_MATERIALS_PARAMS_VALUE:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MATERIALS_PARAMS_VALUE:
      return {
        ...state,
        materialParamsValue: [
          ...state.materialParamsValue,
          action.materialParamsValue,
        ],
      };
    case DELETE_MATERIALS_PARAMS_VALUE:
      return {
        ...state,
        materialParamsValue: state.materialParamsValue.filter(
          (materialParamsValue) => materialParamsValue._id !== action._id
        ),
      };
    default:
      return state;
  }
};
