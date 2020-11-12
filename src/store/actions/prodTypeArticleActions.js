import { getToken } from "../../utils/utils";
import {
  createProdArticle,
  deleteProdArticle,
  fetchFilteredProdArticle,
  fetchProdArticle,
  fetchSingleProdArticle,
  patchProdArticle,
} from "../api/api";
import {
  SET_PROD_ARTICLE,
  SET_FILTERED_PROD_ARTICLE,
  ADD_PROD_ARTICLE,
  DELETE_PROD_ARTICLE,
  SET_SINGLE_PROD_ARTICLE,
} from "./actionTypes";

export const getProdArticleAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchProdArticle(token);
      if (response.status === 200) {
        dispatch({ type: SET_PROD_ARTICLE, prodArticle: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const getSingleProdArticleAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSingleProdArticle(id, token);
      dispatch({
        type: SET_SINGLE_PROD_ARTICLE,
        singleProdArticle: response.data,
      });
    } catch (e) {
      return false;
    }
  };
};
export const filterProdArticleAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdArticle(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_ARTICLE,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_ARTICLE,
        filtered: [],
      });
    }
  };
};

export const createProdArticleAction = (prodArticle) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createProdArticle(prodArticle, token);
      if (response.status === 200) {
        dispatch({ type: ADD_PROD_ARTICLE, token, prodArticle: response.data });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editProdArticleAction = (prodArticle, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchProdArticle(id, token, prodArticle);
      dispatch({ type: ADD_PROD_ARTICLE, token, prodArticle: response.data });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deleteProdArticleAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deleteProdArticle(id, token);
      if (responce.status === 200) {
        dispatch({ type: DELETE_PROD_ARTICLE, id, prodArticle: responce.data });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
