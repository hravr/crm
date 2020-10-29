import { getToken } from "../../utils/utils";
import {
  createRoztsinka,
  deleteRoztsinka,
  fetchFilteredRoztsinka,
  fetchRoztsinka,
  fetchSingleRoztsinka,
  patchRoztsinka,
} from "../api/api";
import {
  ADD_ROZTSINKA,
  DELETE_ROZTSINKA,
  SET_FILTER_ROZTSINKA,
  SET_ROZTSINKA,
  SET_SINGLE_ROZTSINKA,
} from "./actionTypes";

export const getRoztsinkaAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchRoztsinka(token);
    if (response.status === 200) {
      dispatch({ type: SET_ROZTSINKA, roztsinka: response.data });
    }
  };
};

export const getSingleRoztsinkaAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSingleRoztsinka(id, token);
    dispatch({ type: SET_SINGLE_ROZTSINKA, singleRoztsinka: response.data });
  };
};

export const filterRoztsinkaAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredRoztsinka(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_ROZTSINKA,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_ROZTSINKA,
        filtered: [],
      });
    }
  };
};

export const createRoztsinkaAction = (roztsinka) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createRoztsinka(roztsinka, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_ROZTSINKA,
        token,
        roztsinka: response.data,
      });
      return true;
    }
  };
};

export const editRoztsinkaAction = (roztsinka, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchRoztsinka(id, token, roztsinka);
    dispatch({ type: ADD_ROZTSINKA, token, roztsinka: response.data });
    return response.status === 200;
  };
};

export const deleteRoztsinkaAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteRoztsinka(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_ROZTSINKA, id });
    }
    return responce.status === 200;
  };
};
