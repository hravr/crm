import { getToken } from "../../utils/utils";
import {
  fetchProdClass,
  fetchFilteredProdClass,
  createProdClass,
  patchProdClass,
  deleteProdClass,
} from "../api/api";
import {
  ADD_PROD_CLASS,
  DELETE_PROD_CLASS,
  SET_FILTERED_PROD_CLASS,
  SET_PROD_CLASS,
} from "./actionTypes";

export const getProdClassAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchProdClass(token);
    if (response.status === 200) {
      dispatch({ type: SET_PROD_CLASS, prodClass: response.data });
    }
    return response.status === 200;
  };
};
export const filterProdClassAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdClass(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_CLASS,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_CLASS,
        filtered: [],
      });
    }
  };
};

export const createProdClassAction = (prodClass) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createProdClass(prodClass, token);
    if (response.status === 200) {
      dispatch({ type: ADD_PROD_CLASS, token, prodClass: response.data });
      return true;
    }
  };
};

export const deleteProdClassAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteProdClass(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PROD_CLASS, id, prodClass: responce.data });
    }
    return responce.status === 200;
  };
};
