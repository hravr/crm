import { SET_MATERIALS_ROZHID } from "../../actions/actionTypes";

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
    default:
      return state;
  }
};
