import { getToken } from "../../../utils/utils";
import {
  createPrajaColor,
  deletePrajaColor,
  fetchPrajaColor,
  fetchSearchPrajaColor,
  patchPrajaColor,
} from "../../api/api";
import {
  ADD_PRAJA_COLOR,
  DELETE_PRAJA_COLOR,
  SET_FILTER_PRAJA_COLOR,
  SET_PRAJA_COLOR,
} from "../actionTypes";

export const getPrajaColorAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaColor(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_COLOR, prajaColor: response.data });
    }
  };
};

export const filterPrajaColorAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchPrajaColor(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_PRAJA_COLOR,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_PRAJA_COLOR,
        filtered: [],
      });
    }
  };
};

export const createPrajaColorAction = (prajaColor) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createPrajaColor(prajaColor, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_PRAJA_COLOR,
        token,
        prajaColor: response.data,
      });
      return true;
    }
  };
};

export const editPrajaColorAction = (prajaColor, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchPrajaColor(prajaColor, token, id);
    dispatch({ type: ADD_PRAJA_COLOR, token });
    return response.status === 200;
  };
};

export const deletePrajaColorAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deletePrajaColor(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PRAJA_COLOR, id, prajaColor: responce.data });
    }
    return responce.status === 200;
  };
};
