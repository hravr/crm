import { getToken } from "../../../utils/utils";
import {
  createPrajaType,
  deletePrajaType,
  fetchPrajaType,
  fetchSearchPrajaType,
  patchPrajaType,
} from "../../api/api";
import {
  ADD_PRAJA_TYPE,
  DELETE_PRAJA_TYPE,
  SET_FILTER_PRAJA_TYPE,
  SET_PRAJA_TYPE,
} from "../actionTypes";

export const getPrajaTypeAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaType(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_TYPE, prajaType: response.data });
    }
  };
};

export const filterPrajaTypeAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchPrajaType(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_PRAJA_TYPE,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_PRAJA_TYPE,
        filtered: [],
      });
    }
  };
};

export const createPrajaTypeAction = (prajaType) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createPrajaType(prajaType, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_PRAJA_TYPE,
        token,
        prajaType: response.data,
      });
      return true;
    }
  };
};

export const editPrajaTypeAction = (prajaType, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchPrajaType(prajaType, token, id);
    dispatch({ type: ADD_PRAJA_TYPE, token });
    return response.status === 200;
  };
};

export const deletePrajaTypeAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deletePrajaType(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PRAJA_TYPE, id, prajaType: responce.data });
    }
    return responce.status === 200;
  };
};
