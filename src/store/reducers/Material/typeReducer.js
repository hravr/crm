import {  SET_MATERIALS_TYPE } from "../../actions/actionTypes";

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
    default:
      return state;
  }
};
