import { getToken } from "../../../utils/utils";
import { fetchPrajaType } from "../../api/api";
import { SET_PRAJA_TYPE } from "../actionTypes";

export const getPrajaTypeAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaType(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_TYPE, prajaType: response.data });
    }
    return response.status === 200;
  };
};
