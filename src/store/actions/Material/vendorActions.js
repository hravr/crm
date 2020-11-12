import { getToken } from "../../../utils/utils";
import {
  createMaterialVendor,
  deleteMaterialVendor,
  fetchMaterialVendor,
  fetchSearchMaterialVendor,
  patchMaterialVendor,
} from "../../api/api";
import {
  SET_MATERIALS_VENDOR,
  DELETE_MATERIALS_VENDOR,
  SET_FILTER_MATERIALS_VENDOR,
  ADD_MATERIALS_VENDOR,
} from "../actionTypes";

export const getMaterialVendorAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchMaterialVendor(token);
      if (response.status === 200) {
        dispatch({
          type: SET_MATERIALS_VENDOR,
          materialVendor: response.data,
        });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const filterMaterialVendorAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMaterialVendor(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MATERIALS_VENDOR,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MATERIALS_VENDOR,
        filtered: [],
      });
    }
  };
};

export const createMaterialVendorAction = (materialVendor) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createMaterialVendor(materialVendor, token);
      if (response.status === 200) {
        dispatch({
          type: ADD_MATERIALS_VENDOR,
          token,
          materialVendor: response.data,
        });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editMaterialVendorAction = (materialVendor, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchMaterialVendor(materialVendor, token, id);
      dispatch({ type: ADD_MATERIALS_VENDOR, token });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deleteMaterialVendorAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const responce = await deleteMaterialVendor(id, token);
      if (responce.status === 200) {
        dispatch({
          type: DELETE_MATERIALS_VENDOR,
          id,
          materialVendor: responce.data,
        });
      }
      return responce.status === 200;
    } catch (e) {
      return false;
    }
  };
};
