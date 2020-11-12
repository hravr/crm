import { getToken } from "../../../utils/utils";
import {
  createPrajaTovtshina,
  deletePrajaTovtshina,
  fetchPrajaTovtshina,
  fetchSearchPrajaTovtshina,
  patchPrajaTovtshina,
} from "../../api/api";
import {
  ADD_PRAJA_TOVTSHINA,
  DELETE_PRAJA_TOVTSHINA,
  SET_FILTER_PRAJA_TOVTSHINA,
  SET_PRAJA_TOVTSHINA,
} from "../actionTypes";

export const getPrajaTovtshinaAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchPrajaTovtshina(token);
      if (response.status === 200) {
        dispatch({ type: SET_PRAJA_TOVTSHINA, prajaTovtshina: response.data });
      }
    } catch (e) {
      return false;
    }
  };
};

export const filterPrajaTovtshinaAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchPrajaTovtshina(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_PRAJA_TOVTSHINA,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_PRAJA_TOVTSHINA,
        filtered: [],
      });
    }
  };
};

export const createPrajaTovtshinaAction = (prajaTovtshina) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createPrajaTovtshina(prajaTovtshina, token);
      if (response.status === 200) {
        dispatch({
          type: ADD_PRAJA_TOVTSHINA,
          token,
          prajaTovtshina: response.data,
        });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editPrajaTovtshinaAction = (prajaTovtshina, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchPrajaTovtshina(prajaTovtshina, token, id);
      dispatch({ type: ADD_PRAJA_TOVTSHINA, token });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deletePrajaTovtshinaAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deletePrajaTovtshina(id, token);
      if (responce.status === 200) {
        dispatch({
          type: DELETE_PRAJA_TOVTSHINA,
          id,
          prajaTovtshina: responce.data,
        });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
