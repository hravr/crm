import {
    ADD_SKLAD3,
    DELETE_SKLAD3,
    SET_FILTERED_SKLAD3,
    SET_SKLAD3,
  } from "../actions/actionTypes";
  
  const initialState = {
    sklad3: "",
    filtered: [],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_SKLAD3:
        return {
          ...state,
          sklad3: action.sklad3,
        };
      case SET_FILTERED_SKLAD3:
        return {
          ...state,
          filtered: action.filtered,
        };
      case ADD_SKLAD3:
        return {
          ...state,
          sklad3: [...state.sklad3, action.sklad3],
        };
      case DELETE_SKLAD3:
        return {
          ...state,
          sklad3: state.sklad3.filter((sklad3) => sklad3._id !== action._id),
        };
      default:
        return state;
    }
  };
  