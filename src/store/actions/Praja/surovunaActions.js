import { fetchPrajaSurovuna } from "../../api/api";
import { getToken } from "../../../utils/utils";
import { SET_PRAJA_SUROVUNA } from "../actionTypes";

export const getPrajaSurovunaAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaSurovuna(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_SUROVUNA, prajaSurovuna: response.data });
    }
    return response.status === 200;
  };
};
