import { getToken } from "../../utils/utils";
import {
  createProdColor,
  deleteProdColor,
  fetchFilteredProdColor,
  fetchProdColor,
  patchProdColor,
} from "../api/api";
import {
  ADD_PROD_COLOR,
  DELETE_PROD_COLOR,
  SET_FILTERED_PROD_COLOR,
  SET_PROD_COLOR,
} from "./actionTypes";

export const getProdColorAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchProdColor(token);
      if (response.status === 200) {
        dispatch({ type: SET_PROD_COLOR, prodColor: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};
export const filterProdColorAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdColor(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_COLOR,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_COLOR,
        filtered: [],
      });
    }
  };
};

export const createProdColorAction = (prodColor) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createProdColor(prodColor, token);
      if (response.status === 200) {
        dispatch({ type: ADD_PROD_COLOR, token, prodColor: response.data });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const deleteProdColorAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deleteProdColor(id, token);
      if (responce.status === 200) {
        dispatch({ type: DELETE_PROD_COLOR, id, prodColor: responce.data });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
