import { getToken } from "../../../utils/utils";
import {
  ADD_MATERIALS,
  DELETE_MATERIALS,
  SET_FILTERED_MATERIALS,
  SET_SINGLE_MATERIALS,
  SET_MATERIALS,
} from "../actionTypes";
import {
  createMaterials, deleteMaterials,
  fetchFilteredMaterials,
  fetchMaterials,
  fetchSingleMaterials,
  patchMaterials
} from "../../api/api";

export const getMaterialsAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterials(token);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS, materials: response.data });
    }
  };
};

export const filterMaterialsAction = ({ from, to, operationId }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredMaterials(from, to, operationId, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_MATERIALS,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_MATERIALS,
        filtered: [],
      });
    }
  };
};

export const getSingleMaterialsAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSingleMaterials(id, token);
    dispatch({ type: SET_SINGLE_MATERIALS, singleMaterials: response.data });
  };
};

export const createMaterialsAction = (zvitu) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createMaterials(zvitu, token);
    if (response.status === 200) {
      dispatch({ type: ADD_MATERIALS, token, materials: response.data });
      return true;
    }
  };
};

export const editMaterialsAction = (zvitu, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchMaterials(id, token, zvitu);
    dispatch({ type: ADD_MATERIALS, token, materials: response.data });
    return response.status === 200;
  };
};

export const deleteMaterialsAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteMaterials(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_MATERIALS, id });
    }
    return responce.status === 200;
  };
};
