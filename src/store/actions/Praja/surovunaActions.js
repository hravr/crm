import { getToken } from "../../../utils/utils";
import {
  createPrajaSurovuna,
  deletePrajaSurovuna,
  fetchPrajaSurovuna,
  fetchSearchPrajaSurovuna,
  patchPrajaSurovuna,
} from "../../api/api";
import {
  ADD_PRAJA_SUROVUNA,
  DELETE_PRAJA_SUROVUNA,
  SET_FILTER_PRAJA_SUROVUNA,
  SET_PRAJA_SUROVUNA,
} from "../actionTypes";

export const getPrajaSurovunaAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaSurovuna(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_SUROVUNA, prajaSurovuna: response.data });
    }
  };
};

export const filterPrajaSurovunaAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchPrajaSurovuna(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_PRAJA_SUROVUNA,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_PRAJA_SUROVUNA,
        filtered: [],
      });
    }
  };
};

export const createPrajaSurovunaAction = (prajaSurovuna) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createPrajaSurovuna(prajaSurovuna, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_PRAJA_SUROVUNA,
        token,
        prajaSurovuna: response.data,
      });
      return true;
    }
  };
};

export const editPrajaSurovunaAction = (prajaSurovuna, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchPrajaSurovuna(prajaSurovuna, token, id);
    dispatch({ type: ADD_PRAJA_SUROVUNA, token });
    return response.status === 200;
  };
};

export const deletePrajaSurovunaAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deletePrajaSurovuna(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PRAJA_SUROVUNA, id });
    }
    return responce.status === 200;
  };
};
