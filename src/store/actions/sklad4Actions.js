import { getToken } from "../../utils/utils";
import {
  createSklad4,
  deleteSklad4,
  fetchFilteredSklad4,
  fetchSingleSklad4,
  fetchSklad4, fetchSklad4Zalushok,
  patchSklad4,
} from "../api/api";
import {
  ADD_SKLAD4,
  DELETE_SKLAD4,  SET_FILTERED_ROZXOD_SKLAD4,
  SET_FILTERED_SKLAD4,
  SET_SINGLE_SKLAD4,
  SET_SKLAD4, SET_SKLAD4_ZALUSHOK,
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

export const getSingleSklad4Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSingleSklad4(id, token);
    dispatch({ type: SET_SINGLE_SKLAD4, singleSklad4: response.data });
  };
};

export const filterSklad4Action = ({sort, from, fromRozxod, toRozxod, to, search}) => {
  return async (dispatch) => {
    const token = getToken();
    if (from && to) {
      const response = await fetchFilteredSklad4({from, to, search, token});
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_SKLAD4,
          filtered: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_SKLAD4,
          filtered: [],
        });
      }
    } else if (fromRozxod && toRozxod) {
      const response = await fetchFilteredSklad4({fromRozxod, toRozxod, search, token});
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD4,
          filteredRozxod: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD4,
          filteredRozxod: [],
        });
      }
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
export const getSklad4ZalushokAction = (data) => {
  return async (dispatch) => {
    const token = getToken();
    const day = new Date();
    if (data) {
      const response = await fetchSklad4Zalushok(token, data);
      if (response.status === 200) {
        dispatch({type: SET_SKLAD4_ZALUSHOK, sklad1_zalushok: response.data});
      }
      return response.status === 200;
    } else {
      const response = await fetchSklad4Zalushok(token, day);
      if (response.status === 200) {
        dispatch({type: SET_SKLAD4_ZALUSHOK, sklad1_zalushok: response.data});
      }
      return response.status === 200;
    }
  };
};
