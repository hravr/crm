import { getToken } from "../../utils/utils";
import {
  createProdSize,
  deleteProdSize,
  fetchFilteredProdSize,
  fetchProdSize,
  patchProdSize,
} from "../api/api";
import {
  ADD_PROD_SIZE,
  DELETE_PROD_SIZE,
  SET_FILTERED_PROD_SIZE,
  SET_PROD_SIZE,
} from "./actionTypes";

export const getProdSizeAction = () => {
  return async (dispatch) => {
    try { const token = getToken();
    const response = await fetchProdSize(token);
    if (response.status === 200) {
      dispatch({ type: SET_PROD_SIZE, prodSize: response.data });
    }
    return response.status === 200;  } catch (e) {
      return false
    }
   
  };
};
export const filterProdSizeAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdSize(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_SIZE,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_SIZE,
        filtered: [],
      });
    }
  };
};

export const createProdSizeAction = (prodSize) => {
  return async (dispatch) => {
    try {  const token = getToken();
    const response = await createProdSize(prodSize, token);
    if (response.status === 200) {
      dispatch({ type: ADD_PROD_SIZE, token, prodSize: response.data });
      return true;
    } } catch (e) {
      return false
    }
   
  };
};

export const deleteProdSizeAction = (id) => {
  return async (dispatch) => {
    try {const token = getToken();
    const responce = await deleteProdSize(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PROD_SIZE, id, prodSize: responce.data });
    }
    return responce.status === 200;  } catch (e) {
      return false
    }
    
  };
};
