import {getToken} from "../../../utils/utils";
import {ADD_PRIAGA, DELETE_PRIAGA, SET_FILTERED_PRIAGA, SET_PRIAGA, SET_SINGLE_PRIAGA,} from "../actionTypes";
import {
  createPriaga,
  deletePriaga,
  fetchFilteredPriaga,
  fetchPriaga,
  fetchSinglePriaga,
  patchPriaga
} from "../../api/api";

export const getPriagaAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPriaga(token);
    if (response.status === 200) {
      dispatch({type: SET_PRIAGA, materials: response.data});
    }
  };
};

export const filterPriagaAction = ({from, to, fromRozxod, toRozxod, operationId}) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredPriaga({from, to, fromRozxod, toRozxod, operationId, token});
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
    const token = getToken();
    const response = await fetchSinglePriaga(id, token);
    dispatch({type: SET_SINGLE_PRIAGA, singleMaterials: response.data});
  };
};

export const createPriagaAction = (zvitu) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createPriaga(zvitu, token);
    if (response.status === 200) {
      dispatch({type: ADD_PRIAGA, token, materials: response.data});
      return true;
    }
  };
};

export const editPriagaAction = (zvitu, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchPriaga(id, token, zvitu);
    dispatch({type: ADD_PRIAGA, token, materials: response.data});
    return response.status === 200;
  };
};

export const deletePriagaAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deletePriaga(id, token);
    if (responce.status === 200) {
      dispatch({type: DELETE_PRIAGA, id});
    }
    return responce.status === 200;
  };
};
