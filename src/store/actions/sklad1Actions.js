import { getToken } from "../../utils/utils";
import {
  createSklad1,
  deleteSklad1,
  fetchFilteredSklad1,
  fetchSingleSklad1,
  fetchSklad1,
  fetchSklad1to2,
  fetchSklad1to3,
  fetchSklad1to4,
  fetchSklad1Zalushok,
  patchSklad1,
} from "../api/api";
import {
  ADD_SKLAD1,
  DELETE_SKLAD1,
  SET_FILTERED_ROZXOD_SKLAD1,
  SET_FILTERED_SKLAD1,
  SET_SINGLE_SKLAD1,
  SET_SKLAD1,
  SET_SKLAD1_TO2,
  SET_SKLAD1_ZALUSHOK,
} from "./actionTypes";

export const getSklad1ZalushokAction = (data) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const day = new Date();
      if (data) {
        const response = await fetchSklad1Zalushok(token, data);
        if (response.status === 200) {
          dispatch({
            type: SET_SKLAD1_ZALUSHOK,
            sklad1_zalushok: response.data,
          });
        }
        return response.status === 200;
      } else {
        const response = await fetchSklad1Zalushok(token, day);
        if (response.status === 200) {
          dispatch({
            type: SET_SKLAD1_ZALUSHOK,
            sklad1_zalushok: response.data,
          });
        }
        return response.status === 200;
      }
    } catch (e) {
      return false;
    }
  };
};

export const getSklad1Action = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSklad1(token);
      if (response.status === 200) {
        dispatch({ type: SET_SKLAD1, sklad1: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const getSklad1RozxodAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_SKLAD1, sklad1: [] });
      return;
    } catch (e) {
      return false;
    }
  };
};

export const postSklad1to2Action = (data) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSklad1to2(token, data);
      if (response.status === 200) {
        dispatch({ type: SET_SKLAD1_TO2, sklad1to2: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};
export const getSingleSklad1Action = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSingleSklad1(id, token);
      dispatch({ type: SET_SINGLE_SKLAD1, singleSklad1: response.data });
    } catch (e) {
      return false;
    }
  };
};
export const getSklad1to2Action = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSklad1to2(token);
      if (response.status === 200) {
        dispatch({ type: SET_SKLAD1_TO2, sklad1to2: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};
export const postSklad1to3Action = (data) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSklad1to3(token, data);
      if (response.status === 200) {
        dispatch({ type: SET_SKLAD1_TO2, sklad1to2: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const postSklad1to4Action = (data) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSklad1to4(token, data);
      if (response.status === 200) {
        dispatch({ type: SET_SKLAD1_TO2, sklad1to2: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const filterSklad1Action = ({
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
      const response = await fetchFilteredSklad1({ from, to, search, token });
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_SKLAD1,
          filtered: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_SKLAD1,
          filtered: [],
        });
      }
    } else if (fromRozxod && toRozxod) {
      const response = await fetchFilteredSklad1({
        fromRozxod,
        toRozxod,
        search,
        token,
      });
      if (response?.data) {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD1,
          filteredRozxod: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTERED_ROZXOD_SKLAD1,
          filteredRozxod: [],
        });
      }
    }
  };
};

export const createSklad1Action = (sklad1) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createSklad1(sklad1, token);
      if (response.status === 200) {
        dispatch({ type: ADD_SKLAD1, token, sklad1: response.data });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editSklad1ction = (sklad1, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchSklad1(sklad1, token, id);
      dispatch({ type: ADD_SKLAD1, token, sklad1: response.data });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deleteSklad1Action = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deleteSklad1(id, token);
      if (responce.status === 200) {
        dispatch({ type: DELETE_SKLAD1, id, sklad1: responce.data });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
