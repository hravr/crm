import { getToken } from "../../utils/utils";
import {
  createZpSklad1,
  deleteZpSklad1,
  fetchSearchZpSklad1,
  fetchZpSklad1,
  patchZpSklad1,
} from "../api/api";
import {
  ADD_ZP_SKLAD1,
  DELETE_ZP_SKLAD1,
  SET_FILTERED_ZP_SKLAD1,
  SET_ZP_SKLAD1,
} from "./actionTypes";

export const getZpSklad1Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZpSklad1(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZP_SKLAD1, zp_sklad1: response.data });
    }
    return response.status === 200;
  };
};

export const searchZpSklad1Action = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchZpSklad1(search, token);
    if (response?.data?.history) {
      dispatch({
        type: SET_FILTERED_ZP_SKLAD1,
        filtered: response.data.history,
      });
    } else {
      dispatch({
        type: SET_FILTERED_ZP_SKLAD1,
        filtered: [],
      });
    }
  };
};

export const createZpSklad1Action = (zp_sklad1) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createZpSklad1(zp_sklad1, token);
    if (response.status === 200) {
      dispatch({ type: ADD_ZP_SKLAD1, token });
      return true;
    }
  };
};

export const editZpSklad1Action = (zp_sklad1, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchZpSklad1(zp_sklad1, token, id);
    dispatch({ type: ADD_ZP_SKLAD1, token });
    return response.status === 200;
  };
};

export const deleteZpSklad1Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteZpSklad1(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_ZP_SKLAD1, id });
    }
    return responce.status === 200;
  };
};
