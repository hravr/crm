import {
  ADD_PROD_ARTICLE,
  DELETE_PROD_ARTICLE,
  SET_FILTERED_PROD_ARTICLE,
  SET_PROD_ARTICLE,
} from "../actions/actionTypes";

const initialState = {
  prodArticle: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROD_ARTICLE:
      return {
        ...state,
        prodArticle: action.prodArticle,
      };
    case SET_FILTERED_PROD_ARTICLE:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PROD_ARTICLE:
      return {
        ...state,
        prodArticle: [...state.prodArticle, action.prodArticle],
      };
    case DELETE_PROD_ARTICLE:
      return {
        ...state,
        prodArticle: state.prodArticle.filter(
          (prodArticle) => prodArticle._id !== action._id
        ),
      };

    default:
      return state;
  }
};
