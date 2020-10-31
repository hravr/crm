import { getToken } from "../../utils/utils";
import {
  createSklad3,
  deleteSklad3,
  fetchFilteredSklad3,
  fetchSingleSklad3,
  fetchSklad3,
  patchSklad3,
} from "../api/api";
import {
  ADD_SKLAD3,
  DELETE_SKLAD3,
  SET_FILTERED_SKLAD3,
  SET_SINGLE_SKLAD3,
  SET_SKLAD3,
} from "./actionTypes";

export const getSklad3Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSklad3(token);
    if (response.status === 200) {
      dispatch({ type: SET_SKLAD3, sklad3: response.data });
    }
    return response.status === 200;
  };
};
export const getSingleSklad3Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSingleSklad3(id, token);
    dispatch({ type: SET_SINGLE_SKLAD3, singleSklad3: response.data });
  };
};
export const filterSklad3Action = ({ sort, from, to, search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredSklad3(sort, from, to, search, token);
    if (response?.data?.history) {
      dispatch({
        type: SET_FILTERED_SKLAD3,
        filtered: response.data.history,
      });
    } else {
      dispatch({
        type: SET_FILTERED_SKLAD3,
        filtered: [],
      });
    }
  };
};

export const createSklad3Action = (sklad3) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createSklad3(sklad3, token);
    if (response.status === 200) {
      dispatch({ type: ADD_SKLAD3, token });
      return true;
    }
  };
};

export const editSklad3ction = (sklad3, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchSklad3(sklad3, token, id);
    dispatch({ type: ADD_SKLAD3, token });
    return response.status === 200;
  };
};

export const deleteSklad3Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteSklad3(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_SKLAD3, id });
    }
    return responce.status === 200;
  };
};
