import { getToken } from "../../../utils/utils";
import {
  createPrajaRozhid,
  deletePrajaRozhid,
  fetchPrajaRozhid,
  fetchSearchPrajaRozhid,
  patchPrajaRozhid,
} from "../../api/api";
import {
  ADD_PRAJA_ROZHID,
  DELETE_PRAJA_ROZHID,
  SET_FILTER_PRAJA_ROZHID,
  SET_PRAJA_ROZHID,
} from "../actionTypes";

export const getPrajaRozhidAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaRozhid(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_ROZHID, prajaRozhid: response.data });
    }
  };
};

export const filterPrajaRozhidAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchPrajaRozhid(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_PRAJA_ROZHID,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_PRAJA_ROZHID,
        filtered: [],
      });
    }
  };
};

export const createPrajaRozhidAction = (prajaRozhid) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createPrajaRozhid(prajaRozhid, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_PRAJA_ROZHID,
        token,
        prajaRozhid: response.data,
      });
      return true;
    }
  };
};

export const editPrajaRozhidAction = (prajaRozhid, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchPrajaRozhid(prajaRozhid, token, id);
    dispatch({ type: ADD_PRAJA_ROZHID, token });
    return response.status === 200;
  };
};

export const deletePrajaRozhidAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deletePrajaRozhid(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PRAJA_ROZHID, id });
    }
    return responce.status === 200;
  };
};
