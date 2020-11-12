import { getToken } from "../../../utils/utils";
import {
  createMaterialParamsValue,
  deleteMaterialParamsValue,
  fetchMaterialParamsValue,
  fetchSearchMaterialParamsValue,
  fetchSingleMaterialParamsValue,
  patchMaterialParamsValue,
} from "../../api/api";
import {
  SET_MATERIALS_PARAMS_VALUE,
  DELETE_MATERIALS_PARAMS_VALUE,
  SET_FILTER_MATERIALS_PARAMS_VALUE,
  ADD_MATERIALS_PARAMS_VALUE,
  SET_SINGLE_MATERIALS_PARAMS_VALUE,
} from "../actionTypes";

export const getMaterialParamsValueAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchMaterialParamsValue(token);
      if (response.status === 200) {
        dispatch({
          type: SET_MATERIALS_PARAMS_VALUE,
          materialParamsValue: response.data,
        });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};
export const getSingleMaterialParamsValueAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSingleMaterialParamsValue(id, token);
      dispatch({
        type: SET_SINGLE_MATERIALS_PARAMS_VALUE,
        singleParamsValue: response.data,
      });
    } catch (e) {
      return false;
    }
  };
};
export const filterMaterialParamsValueAction = ({ search }) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSearchMaterialParamsValue(search, token);
      if (response?.data) {
        dispatch({
          type: SET_FILTER_MATERIALS_PARAMS_VALUE,
          filtered: response.data,
        });
      } else {
        dispatch({
          type: SET_FILTER_MATERIALS_PARAMS_VALUE,
          filtered: [],
        });
      }
    } catch (e) {
      return false;
    }
  };
};

export const createMaterialParamsValueAction = (materialParamsValue) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createMaterialParamsValue(
        materialParamsValue,
        token
      );
      if (response.status === 200) {
        dispatch({
          type: ADD_MATERIALS_PARAMS_VALUE,
          token,
          materialParamsValue: response.data,
        });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editMaterialParamsValueAction = (materialParamsValue, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchMaterialParamsValue(
        id,
        materialParamsValue,
        token
      );
      dispatch({
        type: ADD_MATERIALS_PARAMS_VALUE,
        token,
        materialParamsValue: response.data,
      });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deleteMaterialParamsValueAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deleteMaterialParamsValue(id, token);
      if (responce.status === 200) {
        dispatch({
          type: DELETE_MATERIALS_PARAMS_VALUE,
          id,
          materialParamsValue: responce.data,
        });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
