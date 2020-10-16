import { getToken } from "../../utils/utils";
import {
  createProd,
  deleteProd,
  fetchFilteredProd,
  fetchProd,
  patchProd,
} from "../api/api";
import {
  ADD_PROD,
  DELETE_PROD,
  SET_FILTERED_PROD,
  SET_PROD,
} from "./actionTypes";

export const getProdAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchProd(token);
    if (response.status === 200) {
      dispatch({ type: SET_PROD, prod: response.data });
    }
    return response.status === 200;
  };
};

export const filterProdAction = ({ sort, from, to, search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProd(sort, from, to, search, token);
    if (response?.data?.history) {
      dispatch({
        type: SET_FILTERED_PROD,
        filtered: response.data.history,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD,
        filtered: [],
      });
    }
  };
};

export const createProdAction = (prod) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createProd(prod, token);
    if (response.status === 200) {
      dispatch({ type: ADD_PROD, token });
      return true;
    }
  };
};

export const editProdAction = (prod, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchProd(prod, token, id);
    dispatch({ type: ADD_PROD, token });
    return response.status === 200;
  };
};

export const deleteProdAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteProd(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PROD, id });
    }
    return responce.status === 200;
  };
};
