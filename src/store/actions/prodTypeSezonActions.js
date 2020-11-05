import { getToken } from "../../utils/utils";
import {
  createProdSezon,
  deleteProdSezon,
  fetchFilteredProdSezon,
  fetchProdSezon,
  patchProdSezon,
} from "../api/api";
import {
  ADD_PROD_SEZON,
  DELETE_PROD_SEZON,
  SET_FILTERED_PROD_SEZON,
  SET_PROD_SEZON,
} from "./actionTypes";

export const getProdSezonAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchProdSezon(token);
    if (response.status === 200) {
      dispatch({ type: SET_PROD_SEZON, prodSezon: response.data });
    }
    return response.status === 200;
  };
};
export const filterProdSezonAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredProdSezon(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PROD_SEZON,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PROD_SEZON,
        filtered: [],
      });
    }
  };
};

export const createProdSezonAction = (prodSezon) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createProdSezon(prodSezon, token);
    if (response.status === 200) {
      dispatch({ type: ADD_PROD_SEZON, token, prodSezon: response.data });
      return true;
    }
  };
};

export const deleteProdSezonAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteProdSezon(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PROD_SEZON, id, prodSezon: responce.data });
    }
    return responce.status === 200;
  };
};
