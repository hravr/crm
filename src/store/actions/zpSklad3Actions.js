import { getToken } from "../../utils/utils";
import { fetchZpSklad3 } from "../api/api";
import { SET_ZP_SKLAD3 } from "./actionTypes";

export const getZpSklad3Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZpSklad3(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZP_SKLAD3, zpsklad3: response.data });
    }
    return response.status === 200;
  };
};
