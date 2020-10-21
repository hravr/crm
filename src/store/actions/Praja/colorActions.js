import { getToken } from "../../../utils/utils";
import { fetchPrajaColor } from "../../api/api";
import { SET_PRAJA_COLOR } from "../actionTypes";

export const getPrajaColorAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaColor(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_COLOR, prajaColor: response.data });
    }
  };
};
