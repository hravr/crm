import { getToken } from "../../utils/utils";
import { fetchRoztsinka } from "../api/api";
import { SET_ROZTSINKA } from "./actionTypes";

export const getRoztsinkaAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchRoztsinka(token);
    if (response.status === 200) {
      dispatch({ type: SET_ROZTSINKA, roztsinka: response.data });
    }
  };
};
