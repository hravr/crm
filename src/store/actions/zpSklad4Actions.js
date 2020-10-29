import { getToken } from "../../utils/utils";
import { fetchZpSklad1 } from "../api/api";
import { SET_ZP_SKLAD1 } from "./actionTypes";

export const getZpSklad1Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZpSklad1(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZP_SKLAD1, zp_sklad1: response.data });
    }
    return response.status === 200;
  };
};
