import { getToken } from "../../utils/utils";
import {
  createSklad3,
  deleteSklad3, fetchFilteredSklad1,
  fetchFilteredSklad3,
  fetchSingleSklad3,
  fetchSklad3, fetchSklad3Zalushok,
  patchSklad3,
} from "../api/api";
import {
  ADD_SKLAD3,
  DELETE_SKLAD3, SET_FILTERED_ROZXOD_SKLAD1, SET_FILTERED_ROZXOD_SKLAD3, SET_FILTERED_SKLAD1,
  SET_FILTERED_SKLAD3,
  SET_SINGLE_SKLAD3,
  SET_SKLAD3, SET_SKLAD3_ZALUSHOK,
} from "./actionTypes";

export const getSklad3ZalushokAction = (data) => {
  return async (dispatch) => {
    const token = getToken();
    const day = new Date();
    if (data) {
      const response = await fetchSklad3Zalushok(token, data);
      if (response.status === 200) {
        dispatch({type: SET_SKLAD3_ZALUSHOK, sklad1_zalushok: response.data});
      }
      return response.status === 200;
    } else {
      const response = await fetchSklad3Zalushok(token, day);
      if (response.status === 200) {
        dispatch({type: SET_SKLAD3_ZALUSHOK, sklad1_zalushok: response.data});
      }
      return response.status === 200;
    }
  };
};

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

export const filterSklad3Action = ({sort, from, fromRozxod, toRozxod, to, search}) => {
  return async (dispatch) => {
    const token = getToken();
    if (from && to) {
      const response = await fetchFilteredSklad3({from, to, search, token});
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_SKLAD3,
          filtered: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_SKLAD3,
          filtered: [],
        });
      }
    } else if (fromRozxod && toRozxod) {
      const response = await fetchFilteredSklad3({fromRozxod, toRozxod, search, token});
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD3,
          filteredRozxod: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD3,
          filteredRozxod: [],
        });
      }
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
