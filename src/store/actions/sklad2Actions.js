import { getToken } from "../../utils/utils";
import {
  createSklad2,
  deleteSklad2,
  fetchFilteredSklad2,
  fetchSingleSklad2,
  fetchSklad2,
  patchSklad2,
  fetchSklad2Zalushok,
} from "../api/api";
import {
  ADD_SKLAD2,
  DELETE_SKLAD2,
  SET_FILTERED_ROZXOD_SKLAD2,
  SET_FILTERED_SKLAD2,
  SET_SINGLE_SKLAD2,
  SET_SKLAD2,
  SET_SKLAD2_ZALUSHOK,
} from "./actionTypes";

export const getSklad2ZalushokAction = (data) => {
  return async (dispatch) => {
    const token = getToken();
    const day = new Date();
    if (data) {
      const response = await fetchSklad2Zalushok(token, data);
      if (response.status === 200) {
        dispatch({ type: SET_SKLAD2_ZALUSHOK, sklad2_zalushok: response.data });
      }
      return response.status === 200;
    } else {
      const response = await fetchSklad2Zalushok(token, day);
      if (response.status === 200) {
        dispatch({ type: SET_SKLAD2_ZALUSHOK, sklad2_zalushok: response.data });
      }
      return response.status === 200;
    }
  };
};

export const getSklad2Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSklad2(token);
    if (response.status === 200) {
      dispatch({
        type: SET_SKLAD2,
        sklad2: response.data,
      });
    }
    return response.status === 200;
  };
};

export const getSingleSklad2Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSingleSklad2(id, token);
    dispatch({ type: SET_SINGLE_SKLAD2, singleSklad2: response.data });
  };
};

export const filterSklad2Action = ({
  sort,
  from,
  fromRozxod,
  toRozxod,
  to,
  search,
}) => {
  return async (dispatch) => {
    const token = getToken();
    if (from && to) {
      const response = await fetchFilteredSklad2({ from, to, search, token });
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_SKLAD2,
          filtered: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_SKLAD2,
          filtered: [],
        });
      }
    } else if (fromRozxod && toRozxod) {
      const response = await fetchFilteredSklad2({
        fromRozxod,
        toRozxod,
        search,
        token,
      });
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD2,
          filteredRozxod: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD2,
          filteredRozxod: [],
        });
      }
    }
  };
};
export const createSklad2Action = (sklad2) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createSklad2(sklad2, token);
    if (response.status === 200) {
      dispatch({ type: ADD_SKLAD2, token });
      return true;
    }
  };
};

export const editSklad2Action = (sklad2, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchSklad2(sklad2, token, id);
    dispatch({ type: ADD_SKLAD2, token, sklad2: response.data });
    return response.status === 200;
  };
};

export const deleteSklad2Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteSklad2(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_SKLAD2, id });
    }
    return responce.status === 200;
  };
};
