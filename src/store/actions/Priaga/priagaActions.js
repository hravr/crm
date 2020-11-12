import { getToken } from "../../../utils/utils";
import {
  ADD_PRIAGA,
  DELETE_PRIAGA,
  SET_FILTERED_PRIAGA,
  SET_PRIAGA,
  SET_SINGLE_PRIAGA,
  DELETE_PRIAGA_ROZHID,
  ADD_PRIAGA_ROZHID,
} from "../actionTypes";
import {
  createPriaga,
  createPriagaRozhid,
  deletePriaga,
  deletePriagaRozhid,
  fetchFilteredPriaga,
  fetchPriaga,
  fetchSinglePriaga,
  patchPriaga,
} from "../../api/api";

export const getPriagaAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchPriaga(token);
      if (response.status === 200) {
        dispatch({ type: SET_PRIAGA, priaja: response.data });
      }
    } catch (e) {
      return false;
    }
  };
};

export const filterPriagaAction = ({
  from,
  to,
  fromRozxod,
  toRozxod,
  operationId,
}) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredPriaga({
      from,
      to,
      fromRozxod,
      toRozxod,
      operationId,
      token,
    });
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PRIAGA,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PRIAGA,
        filtered: [],
      });
    }
  };
};

export const getSinglePriagaAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSinglePriaga(id, token);
      dispatch({ type: SET_SINGLE_PRIAGA, singlePraja: response.data });
    } catch (e) {
      return false;
    }
  };
};

export const createPriagaAction = (zvitu) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createPriaga(zvitu, token);
      if (response.status === 200) {
        dispatch({ type: ADD_PRIAGA, token, priaja: response.data });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};
export const createPriagaRozhidAction = (priajaRozhid) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createPriagaRozhid(priajaRozhid, token);
      if (response.status === 200) {
        dispatch({
          type: ADD_PRIAGA_ROZHID,
          token,
          priajaRozhid: response.data,
        });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editPriagaAction = (priaga, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchPriaga(id, token, priaga);
      dispatch({ type: ADD_PRIAGA, token, priaja: response.data });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deletePriagaRozhidAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deletePriagaRozhid(id, token);
      if (responce.status === 200) {
        dispatch({ type: DELETE_PRIAGA_ROZHID, id });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
export const deletePriagaAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deletePriaga(id, token);
      if (responce.status === 200) {
        dispatch({ type: DELETE_PRIAGA, id });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
