import { getToken } from "../../utils/utils";
import {
  createOperations,
  deleteOperations,
  fetchOperations,
  fetchSearchOperations,
  patchOperations,
} from "../api/api";
import {
  SET_OPERATIONS,
  SET_FILTERED_OPERATIONS,
  ADD_OPERATIONS,
  DELETE_OPERATIONS,
} from "./actionTypes";

export const getOperationsAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchOperations(token);
      if (response.status === 200) {
        dispatch({ type: SET_OPERATIONS, operations: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const searchOperationsAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchOperations(search, token);
    console.log(response.data);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_OPERATIONS,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_OPERATIONS,
        filtered: [],
      });
    }
  };
};

export const createOperationsAction = (operations) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createOperations(operations, token);
      if (response.status === 200) {
        dispatch({ type: ADD_OPERATIONS, token, operations: response.data });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editOperationsAction = (operations, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchOperations(operations, token, id);
      dispatch({ type: ADD_OPERATIONS, token });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deleteOperationsAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deleteOperations(id, token);
      if (responce.status === 200) {
        dispatch({ type: DELETE_OPERATIONS, id });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
