import { getToken } from "../../utils/utils";
import {
  createZpSklad2,
  deleteZpSklad2,
  fetchSearchZpSklad2,
  fetchZpSklad2,
  patchZpSklad2,
} from "../api/api";
import {
  ADD_ZP_SKLAD2,
  DELETE_ZP_SKLAD2,
  SET_FILTERED_ZP_SKLAD2,
  SET_ZP_SKLAD2,
} from "./actionTypes";

export const getZpSklad2Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZpSklad2(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZP_SKLAD2, zp_sklad2: response.data });
    }
    return response.status === 200;
  };
};

export const searchZpSklad2Action = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchZpSklad2(search, token);
    if (response?.data?.history) {
      dispatch({
        type: SET_FILTERED_ZP_SKLAD2,
        filtered: response.data.history,
      });
    } else {
      dispatch({
        type: SET_FILTERED_ZP_SKLAD2,
        filtered: [],
      });
    }
  };
};

export const createZpSklad2Action = (zp_sklad2) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createZpSklad2(zp_sklad2, token);
    if (response.status === 200) {
      dispatch({ type: ADD_ZP_SKLAD2, token });
      return true;
    }
  };
};

export const editZpSklad2Action = (zp_sklad2, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchZpSklad2(zp_sklad2, token, id);
    dispatch({ type: ADD_ZP_SKLAD2, token });
    return response.status === 200;
  };
};

export const deleteZpSklad2Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteZpSklad2(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_ZP_SKLAD2, id });
    }
    return responce.status === 200;
  };
};
