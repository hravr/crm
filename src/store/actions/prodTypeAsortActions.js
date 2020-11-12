import { getToken } from "../../utils/utils";
import {
  createProdAsortument,
  deleteProdAsortument,
  fetchFilteredProdAsortument,
  fetchProdAsortument,
  patchProdAsortument,
} from "../api/api";
import {
  ADD_PROD_ASORTUMENT,
  DELETE_PROD_ASORTUMENT,
  SET_FILTERED_PROD_ASORTUMENT,
  SET_PROD_ASORTUMENT,
} from "./actionTypes";

export const getProdAsortumentAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchProdAsortument(token);
      if (response.status === 200) {
        dispatch({ type: SET_PROD_ASORTUMENT, prodAsortument: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const filterProdAsortumentAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdAsortument(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_ASORTUMENT,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_ASORTUMENT,
        filtered: [],
      });
    }
  };
};

export const createProdAsortumentAction = (prodAsortument) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createProdAsortument(prodAsortument, token);
      if (response.status === 200) {
        dispatch({
          type: ADD_PROD_ASORTUMENT,
          token,
          prodAsortument: response.data,
        });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const deleteProdAsortumentAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deleteProdAsortument(id, token);
      if (responce.status === 200) {
        dispatch({
          type: DELETE_PROD_ASORTUMENT,
          id,
          prodAsortument: responce.data,
        });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
