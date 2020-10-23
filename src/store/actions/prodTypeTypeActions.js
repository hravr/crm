import { getToken } from "../../utils/utils";
import {
  createProdType,
  deleteProdType,
  fetchFilteredProdType,
  fetchProdType,
  patchProdType,
} from "../api/api";
import {
  ADD_PROD_TYPE,
  DELETE_PROD_TYPE,
  SET_FILTERED_PROD_TYPE,
  SET_PROD_TYPE,
} from "./actionTypes";

export const getProdTypeAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchProdType(token);
    if (response.status === 200) {
      dispatch({ type: SET_PROD_TYPE, prodType: response.data });
    }
    return response.status === 200;
  };
};
export const filterProdTypeAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdType(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_TYPE,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_TYPE,
        filtered: [],
      });
    }
  };
};

export const createProdTypeAction = (prodType) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createProdType(prodType, token);
    if (response.status === 200) {
      dispatch({ type: ADD_PROD_TYPE, token, prodType: response.data });
      return true;
    }
  };
};

export const editProdTypeAction = (prodType, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchProdType(prodType, token, id);
    dispatch({ type: ADD_PROD_TYPE, token });
    return response.status === 200;
  };
};

export const deleteProdTypeAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteProdType(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PROD_TYPE, id });
    }
    return responce.status === 200;
  };
};
