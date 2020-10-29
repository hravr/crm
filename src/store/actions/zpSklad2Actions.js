import { getToken } from "../../utils/utils";
import { fetchZpSklad2 } from "../api/api";
import { SET_ZP_SKLAD2 } from "./actionTypes";

export const getZpSklad2Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZpSklad2(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZP_SKLAD2, zp_sklad2: response.data });
    }
    return response.status === 200;
  };
};
