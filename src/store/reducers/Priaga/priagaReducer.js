import {
  ADD_MATERIALS,
  DELETE_MATERIALS,
  SET_FILTERED_MATERIALS,
  SET_SINGLE_MATERIALS,
  SET_MATERIALS, SET_PRIAGA, SET_FILTERED_PRIAGA, SET_SINGLE_PRIAGA, ADD_PRIAGA, DELETE_PRIAGA,
} from "../../actions/actionTypes";

const initialState = {
  materials: "",
  filtered: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRIAGA:
      return {
        ...state,
        materials: action.materials,
      };
    case SET_SINGLE_PRIAGA:
      return { ...state, single: action.singleMaterials };
    case ADD_PRIAGA:
      return {
        ...state,
        materials: [...state.materials, action.materials],
      };
    case SET_FILTERED_PRIAGA:
      return {
        ...state,
        filtered: action.filtered,
      };
    case DELETE_PRIAGA:
      return {
        ...state,
        materials: state.materials.filter((material) => material._id !== action._id),
      };
    default:
      return state;
  }
};
