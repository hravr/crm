import { fetchPrajaRozhid } from "../../api/api";
import { getToken } from "../../../utils/utils";
import { SET_PRAJA_ROZHID } from "../actionTypes";

export const getPrajaRozhidAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaRozhid(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_ROZHID, prajaRozhid: response.data });
    }
    return response.status === 200;
  };
};
