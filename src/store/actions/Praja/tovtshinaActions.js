import { fetchPrajaTovtshina } from "../../api/api";
import { getToken } from "../../../utils/utils";
import { SET_PRAJA_TOVTSHINA } from "../actionTypes";

export const getPrajaTovtshinaAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaTovtshina(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_TOVTSHINA, prajaTovtshina: response.data });
    }
    return response.status === 200;
  };
};
