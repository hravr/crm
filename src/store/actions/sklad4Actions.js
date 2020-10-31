import { getToken } from "../../utils/utils";
import {
  createSklad4,
  deleteSklad4,
  fetchFilteredSklad4,
  fetchSklad4,
  patchSklad4,
} from "../api/api";
import {
  ADD_SKLAD4,
  DELETE_SKLAD4,
  SET_FILTERED_SKLAD4,
  SET_SKLAD4,
} from "./actionTypes";

export const getSklad4Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSklad4(token);
    if (response.status === 200) {
      dispatch({ type: SET_SKLAD4, sklad4: response.data });
    }
    return response.status === 200;
  };
};
export const filterSklad4Action = ({ sort, from, to, search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredSklad4(sort, from, to, search, token);
    if (response?.data?.history) {
      dispatch({
        type: SET_FILTERED_SKLAD4,
        filtered: response.data.history,
      });
    } else {
      dispatch({
        type: SET_FILTERED_SKLAD4,
        filtered: [],
      });
    }
  };
};

export const createSklad4Action = (sklad4) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createSklad4(sklad4, token);
    if (response.status === 200) {
      dispatch({ type: ADD_SKLAD4, token });
      return true;
    }
  };
};

export const editSklad4ction = (sklad4, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchSklad4(sklad4, token, id);
    dispatch({ type: ADD_SKLAD4, token });
    return response.status === 200;
  };
};

export const deleteSklad4Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteSklad4(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_SKLAD4, id });
    }
    return responce.status === 200;
  };
};
