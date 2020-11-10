import { getToken } from "../../../utils/utils";
import {
  createMaterialRozhid,
  deleteMaterialRozhid,
  fetchMaterialRozhid,
  fetchSearchMaterialRozhid,
  patchMaterialRozhid,
} from "../../api/api";
import {
  SET_MATERIALS_ROZHID,
  DELETE_MATERIALS_ROZHID,
  SET_FILTER_MATERIALS_ROZHID,
  ADD_MATERIALS_ROZHID, ADD_MATERIALS_DILANKA,
} from "../actionTypes";

export const getMaterialRozhidAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialRozhid(token);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS_ROZHID, materialRozhid: response.data });
    }
    return response.status === 200;
  };
};

export const filterMaterialRozhidAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMaterialRozhid(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MATERIALS_ROZHID,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MATERIALS_ROZHID,
        filtered: [],
      });
    }
  };
};

export const createMaterialRozhidAction = (materialRozhid) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createMaterialRozhid(materialRozhid, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_MATERIALS_DILANKA,
        materialRozhid: response.data,
      });
      return response.status === 200;
    }
    return response.status === 200;
  };
};

export const editMaterialRozhidAction = (materialRozhid, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchMaterialRozhid(materialRozhid, token, id);
    dispatch({ type: ADD_MATERIALS_ROZHID, token });
    return response.status === 200;
  };
};

export const deleteMaterialRozhidAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteMaterialRozhid(id, token);
    if (responce.status === 200) {
      dispatch({
        type: DELETE_MATERIALS_ROZHID,
        id,
        materialRozhid: responce.data,
      });
    }
    return responce.status === 200;
  };
};
