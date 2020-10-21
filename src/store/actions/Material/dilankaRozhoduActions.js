import { getToken } from "../../../utils/utils";
import {  fetchMaterialRozhid } from "../../api/api";
import {  SET_MATERIALS_ROZHID } from "../actionTypes";

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
