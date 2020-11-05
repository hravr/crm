import {
  ADD_MATERIALS_ROZXID, DELETE_MATERIALS_ROZXID, SET_FILTERED_MATERIALS_ROZXID,
  SET_MATERIALS_ROZXID, SET_SINGLE_MATERIALS_ROZXID

} from "../../actions/actionTypes";

const initialState = {
  materialRozxid: "",
  filtered: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MATERIALS_ROZXID:
      return {
        ...state,
        materialRozxid: action.materialRozxid,
      };
    case SET_SINGLE_MATERIALS_ROZXID:
      return { ...state, single: action.singleMaterialRozxid };
    case ADD_MATERIALS_ROZXID:
      return {
        ...state,
        materialRozxid: [...state.materialRozxid, action.materialRozxid],
      };
    case SET_FILTERED_MATERIALS_ROZXID:
      return {
        ...state,
        filtered: action.filtered,
      };
    case DELETE_MATERIALS_ROZXID:
      return {
        ...state,
        materialRozxid: state.materialRozxid.filter(
          (zvituRozxid) => zvituRozxid._id !== action._id
        ),
      };

    default:
      return state;
  }
};
