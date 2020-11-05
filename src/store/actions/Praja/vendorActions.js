import { getToken } from "../../../utils/utils";
import {
  createPrajaVendor,
  deletePrajaVendor,
  fetchPrajaVendor,
  fetchSearchPrajaVendor,
  patchPrajaVendor,
} from "../../api/api";
import {
  ADD_PRAJA_VENDOR,
  DELETE_PRAJA_VENDOR,
  SET_FILTER_PRAJA_VENDOR,
  SET_PRAJA_VENDOR,
} from "../actionTypes";

export const getPrajaVendorAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaVendor(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_VENDOR, prajaVendor: response.data });
    }
  };
};

export const filterPrajaVendorAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchPrajaVendor(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_PRAJA_VENDOR,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_PRAJA_VENDOR,
        filtered: [],
      });
    }
  };
};

export const createPrajaVendorAction = (prajaVendor) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createPrajaVendor(prajaVendor, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_PRAJA_VENDOR,
        token,
        prajaVendor: response.data,
      });
      return true;
    }
  };
};

export const editPrajaVendorAction = (prajaVendor, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchPrajaVendor(prajaVendor, token, id);
    dispatch({ type: ADD_PRAJA_VENDOR, token });
    return response.status === 200;
  };
};

export const deletePrajaVendorAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deletePrajaVendor(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_PRAJA_VENDOR, id, prajaVendor: responce.data });
    }
    return responce.status === 200;
  };
};
