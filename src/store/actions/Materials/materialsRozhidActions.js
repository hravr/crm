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
  DELETE_MATERIALS_ROZXID, SET_FILTERED_MATERIALS_ROZXID,
  SET_MATERIALS_ROZXID, SET_SINGLE_MATERIALS_ROZXID
} from "../actionTypes";

export const getMaterialsRozxidAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZvituRozxid(token);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS_ROZXID, materialRozxid: response.data });
    }
  };
};

export const filterMaterialsRozxidAction = ({ from, to, operationId }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredZvituRozxid(from, to, operationId, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_MATERIALS_ROZXID,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_MATERIALS_ROZXID,
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
      type: SET_SINGLE_MATERIALS_ROZXID,
      singleMaterialRozxid: response.data,
    });
  };
};

// export const createZvituRozxidAction = (zvituRozxid) => {
//   return async (dispatch) => {
//     const token = getToken();
//     const response = await createZvituRozxid(zvituRozxid, token);
//     if (response.status === 200) {
//       dispatch({ type: ADD_MATERIALS_ROZXID, token, zvituRozxid: response.data });
//       return true;
//     }
//   };
// };
//
// export const editZvituRozxidAction = (zvituRozxid, id) => {
//   return async (dispatch) => {
//     const token = getToken();
//     const response = await patchZvituRozxid(zvituRozxid, token, id);
//     dispatch({ type: ADD_ZVITU_ROZXID, token, zvituRozxid: response.data });
//     return response.status === 200;
//   };
// };

export const deleteMaterialsRozxidAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteZvituRozxid(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_MATERIALS_ROZXID, id });
    }
    return responce.status === 200;
  };
};
