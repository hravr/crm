import { getToken } from "../../../utils/utils";
import {
  createMaterialType,
  deleteMaterialType,
  fetchMaterialType,
  fetchSearchMaterialType,
  patchMaterialType,
} from "../../api/api";
import {
  SET_MATERIALS_TYPE,
  DELETE_MATERIALS_TYPE,
  SET_FILTER_MATERIALS_TYPE,
  ADD_MATERIALS_TYPE,
} from "../actionTypes";

export const getMaterialTypeAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialType(token);
    if (response.status === 200) {
      dispatch({
        type: SET_MATERIALS_TYPE,
        materialType: response.data,
      });
    }
    return response.status === 200;
  };
};

export const filterMaterialTypeAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMaterialType(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MATERIALS_TYPE,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MATERIALS_TYPE,
        filtered: [],
      });
    }
  };
};

export const createMaterialTypeAction = (materialType) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createMaterialType(materialType, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_MATERIALS_TYPE,
        token,
        materialType: response.data,
      });
      return true;
    }
  };
};

export const editMaterialTypeAction = (materialType, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchMaterialType(materialType, token, id);
    dispatch({ type: ADD_MATERIALS_TYPE, token });
    return response.status === 200;
  };
};

export const deleteMaterialTypeAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteMaterialType(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_MATERIALS_TYPE, id });
    }
    return responce.status === 200;
  };
};
