import { getToken } from "../../utils/utils";
import {
  createSklad1,
  deleteSklad1,
  fetchFilteredSklad1,
  fetchSklad1,
  fetchSklad1to2,
  patchSklad1,
} from "../api/api";
import {
  SET_SKLAD1,
  SET_FILTERED_SKLAD1,
  ADD_SKLAD1,
  DELETE_SKLAD1,
  SET_SKLAD1_TO2,
} from "./actionTypes";

export const getSklad1Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSklad1(token);
    if (response.status === 200) {
      dispatch({ type: SET_SKLAD1, sklad1: response.data });
    }
    return response.status === 200;
  };
};
export const getSklad1to2Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSklad1to2(token);
    if (response.status === 200) {
      dispatch({ type: SET_SKLAD1_TO2, sklad1to2: response.data });
    }
    return response.status === 200;
  };
};

export const filterSklad1Action = ({ sort, from, to, search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredSklad1(sort, from, to, search, token);
    if (response?.data?.history) {
      dispatch({
        type: SET_FILTERED_SKLAD1,
        filtered: response.data.history,
      });
    } else {
      dispatch({
        type: SET_FILTERED_SKLAD1,
        filtered: [],
      });
    }
  };
};

export const createSklad1Action = (sklad1) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createSklad1(sklad1, token);
    if (response.status === 200) {
      dispatch({ type: ADD_SKLAD1, token, sklad1: response.data });
      return true;
    }
  };
};

export const editSklad1ction = (sklad1, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchSklad1(sklad1, token, id);
    dispatch({ type: ADD_SKLAD1, token, sklad1: response.data });
    return response.status === 200;
  };
};

export const deleteSklad1Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteSklad1(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_SKLAD1, id });
    }
    return responce.status === 200;
  };
};
