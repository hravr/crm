import { getToken } from "../../../utils/utils";
import { fetchMachine } from "../../api/api";
import { SET_MACHINE } from "../actionTypes";

export const getMachineAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMachine(token);
    if (response.status === 200) {
      dispatch({ type: SET_MACHINE, machines: response.data });
      return response.status === 200;
    }
  };
};
