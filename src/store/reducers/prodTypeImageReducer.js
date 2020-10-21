import { ADD_PROD_IMAGE, DELETE_PROD_IMAGE, SET_FILTERED_PROD_IMAGE, SET_PROD_IMAGE } from "../actions/actionTypes";

const initialState = {
  prodImage: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_IMAGE:
      return {
        ...state,
        prodImage: action.prodImage,
      };
      case SET_FILTERED_PROD_IMAGE:
        return {
          ...state,
          filtered: action.filtered,
        };
      case ADD_PROD_IMAGE:
        return {
          ...state,
          prodImage: [...state.prodImage, action.prodImage],
        };
      case DELETE_PROD_IMAGE:
        return {
          ...state,
          prodImage: state.prodImage.filter(
            (prodImage) => prodImage._id !== action._id
          ),
        };
    default:
      return state;
  }
};
