import { getToken } from "../../../utils/utils";
import {
  createZvitu,
  deleteZvitu,
  fetchFilteredZvitu,
  fetchSingleZvitu,
  fetchZvitu,
  patchZvitu,
} from "../../api/api";
import {
  ADD_ZVITU,
  DELETE_ZVITU,
  SET_FILTERED_ZVITU,
  SET_SINGLE_ZVITU,
  SET_ZVITU,
} from "../actionTypes";

export const getZvituAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZvitu(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZVITU, zvitu: response.data });
    }
  };
};

export const filterZvituAction = ({ from, to, operationId }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredZvitu(from, to, operationId, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_ZVITU,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_ZVITU,
        filtered: [],
      });
    }
  };
};

export const getSingleZvituAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSingleZvitu(id, token);
    dispatch({ type: SET_SINGLE_ZVITU, singleZvitu: response.data });
  };
};

export const createZvituAction = (zvitu) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createZvitu(zvitu, token);
    if (response.status === 200) {
      dispatch({ type: ADD_ZVITU, token, zvitu: response.data });
      return true;
    }
  };
};

export const editZvituAction = (zvitu, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchZvitu(id, token, zvitu);
    dispatch({ type: ADD_ZVITU, token, zvitu: response.data });
    return response.status === 200;
  };
};

export const deleteZvituAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteZvitu(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_ZVITU, id });
    }
    return responce.status === 200;
  };
};
