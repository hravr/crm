import { getToken } from "../../../utils/utils";
import {
  createMaterialParams,
  deleteMaterialParams,
  fetchMaterialParams,
  fetchSearchMaterialParams,
  patchMaterialParams,
} from "../../api/api";
import {
  SET_MATERIALS_PARAMS,
  DELETE_MATERIALS_PARAMS,
  SET_FILTER_MATERIALS_PARAMS,
  ADD_MATERIALS_PARAMS,
} from "../actionTypes";

export const getMaterialParamsAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialParams(token);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS_PARAMS, materialParams: response.data });
    }
    return response.status === 200;
  };
};

export const filterMaterialParamsAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMaterialParams(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MATERIALS_PARAMS,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MATERIALS_PARAMS,
        filtered: [],
      });
    }
  };
};

export const createMaterialParamsAction = (materialParams) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createMaterialParams(materialParams, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_MATERIALS_PARAMS,
        token,
        materialParams: response.data,
      });
      return true;
    }
  };
};

export const editMaterialParamsAction = (materialParams, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchMaterialParams(materialParams, token, id);
    dispatch({ type: ADD_MATERIALS_PARAMS, token });
    return response.status === 200;
  };
};

export const deleteMaterialParamsAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteMaterialParams(id, token);
    if (responce.status === 200) {
      dispatch({
        type: DELETE_MATERIALS_PARAMS,
        id,
        materialParams: responce.data,
      });
    }
    return responce.status === 200;
  };
};
