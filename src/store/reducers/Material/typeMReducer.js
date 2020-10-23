import {
  ADD_MATERIALS_TYPE,
  DELETE_MATERIALS_TYPE,
  SET_FILTER_MATERIALS_TYPE,
  SET_MATERIALS_TYPE,
} from "../../actions/actionTypes";

const initialState = {
  materialType: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS_TYPE:
      return {
        ...state,
        materialType: action.materialType,
      };
    case SET_FILTER_MATERIALS_TYPE:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MATERIALS_TYPE:
      return {
        ...state,
        materialType: [...state.materialType, action.materialType],
      };
    case DELETE_MATERIALS_TYPE:
      return {
        ...state,
        materialType: state.materialType.filter(
          (materialType) => materialType._id !== action._id
        ),
      };
    default:
      return state;
  }
};
