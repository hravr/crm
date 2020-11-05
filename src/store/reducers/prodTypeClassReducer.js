import {
  ADD_PROD_CLASS,
  DELETE_PROD_CLASS,
  SET_FILTERED_PROD_CLASS,
  SET_PROD_CLASS,
} from "../actions/actionTypes";

const initialState = {
  prodClass: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_CLASS:
      return {
        ...state,
        prodClass: action.prodClass,
      };
    case SET_FILTERED_PROD_CLASS:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD_CLASS:
      return {
        ...state,
        prodClass: [...state.prodClass, action.prodClass],
      };
    case DELETE_PROD_CLASS:
      return {
        ...state,
        prodClass: state.prodClass.filter(
          (prodClass) => prodClass._id !== action.id
        ),
      };
    default:
      return state;
  }
};
