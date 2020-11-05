import { getToken } from "../../../utils/utils";
import {
  createZvituRozxid,
  deleteZvituRozxid,
  fetchFilteredZvituRozxid,
  fetchSingleZvituRozxid,
  fetchZvituRozxid,
  patchZvituRozxid,
} from "../../api/api";
import {
  ADD_ZVITU_ROZXID,
  DELETE_ZVITU_ROZXID,
  SET_FILTERED_ZVITU_ROZXID,
  SET_SINGLE_ZVITU_ROZXID,
  SET_ZVITU_ROZXID,
} from "../actionTypes";

export const getZvituRozxidAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZvituRozxid(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZVITU_ROZXID, zvituRozxid: response.data });
    }
  };
};

export const filterZvituRozxidAction = ({ from, to, operationId }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredZvituRozxid(
      from,
      to,
      operationId,
      token
    );
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_ZVITU_ROZXID,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_ZVITU_ROZXID,
        filtered: [],
      });
    }
  };
};

export const getSingleZvituRozxidAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSingleZvituRozxid(id, token);
    dispatch({
      type: SET_SINGLE_ZVITU_ROZXID,
      singleZvituRozxid: response.data,
    });
  };
};

export const createZvituRozxidAction = (zvituRozxid) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createZvituRozxid(zvituRozxid, token);
    if (response.status === 200) {
      dispatch({ type: ADD_ZVITU_ROZXID, token, zvituRozxid: response.data });
      return true;
    }
  };
};

export const editZvituRozxidAction = (zvituRozxid, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchZvituRozxid(zvituRozxid, token, id);
    dispatch({ type: ADD_ZVITU_ROZXID, token, zvituRozxid: response.data });
    return response.status === 200;
  };
};

export const deleteZvituRozxidAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteZvituRozxid(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_ZVITU_ROZXID, id, zvituRozxid: responce.data });
    }
    return responce.status === 200;
  };
};
