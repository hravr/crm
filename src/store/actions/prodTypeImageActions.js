import { getToken } from "../../utils/utils";
import {
  createProdImage,
  deleteProdImage,
  fetchFilteredProdImage,
  fetchProdImage,
  patchProdImage,
} from "../api/api";
import {
  ADD_PROD_IMAGE,
  DELETE_PROD_IMAGE,
  SET_FILTERED_PROD_IMAGE,
  SET_PROD_IMAGE,
} from "./actionTypes";

export const getProdImageAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchProdImage(token);
    if (response.status === 200) {
      dispatch({ type: SET_PROD_IMAGE, prodImage: response.data });
    }
    return response.status === 200;
  };
};

export const filterProdImageAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdImage(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_IMAGE,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_IMAGE,
        filtered: [],
      });
    }
  };
};

export const createProdImageAction = (prodImage) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createProdImage(prodImage, token);
    if (response.status === 200) {
      dispatch({ type: ADD_PROD_IMAGE, token, prodImage: response.data });
      return true;
    }
  };
};

export const editProdImageAction = (prodImage, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchProdImage(prodImage, token, id);
    dispatch({ type: ADD_PROD_IMAGE, token });
    return response.status === 200;
  };
};

export const deleteProdImageAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteProdImage(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PROD_IMAGE, id });
    }
    return responce.status === 200;
  };
};
