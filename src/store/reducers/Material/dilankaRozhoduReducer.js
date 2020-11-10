import {
  ADD_MATERIALS_DILANKA,
  ADD_MATERIALS_ROZHID,
  DELETE_MATERIALS_ROZHID,
  SET_FILTER_MATERIALS_ROZHID,
  SET_MATERIALS_ROZHID,
} from "../../actions/actionTypes";

const initialState = {
  materialRozhid: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS_ROZHID:
      return {
        ...state,
        materialRozhid: action.materialRozhid,
      };
    case SET_FILTER_MATERIALS_ROZHID:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_MATERIALS_DILANKA:
      return {
        ...state,
        materialRozhid: [...state.materialRozhid, action.materialRozhid],
      };
    case DELETE_MATERIALS_ROZHID:
      return {
        ...state,
        materialRozhid: state.materialRozhid.filter(
          (materialRozhid) => materialRozhid._id !== action.id
        ),
      };
    default:
      return state;
  }
};
