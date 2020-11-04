import {
  ADD_MATERIALS,
  DELETE_MATERIALS,
  SET_FILTERED_MATERIALS,
  SET_SINGLE_MATERIALS,
  SET_MATERIALS,
} from "../../actions/actionTypes";

const initialState = {
  materials: "",
  filtered: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS:
      return {
        ...state,
        materials: action.materials,
      };
    case SET_SINGLE_MATERIALS:
      return { ...state, single: action.singleMaterials };
    case ADD_MATERIALS:
      return {
        ...state,
        materials: [...state.materials, action.materials],
      };
    case SET_FILTERED_MATERIALS:
      return {
        ...state,
        filtered: action.filtered,
      };
    case DELETE_MATERIALS:
      return {
        ...state,
        materials: state.materials.filter((material) => material._id !== action._id),
      };
    default:
      return state;
  }
};
