import { getToken } from "../../../utils/utils";
import { fetchMachineDuymu } from "../../api/api";
import { SET_MACHINE_DYUMU } from "../actionTypes";

export const getMachineDuymuAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMachineDuymu(token);
    if (response.status === 200) {
      dispatch({ type: SET_MACHINE_DYUMU, machineDuymu: response.data });
    }
    return response.status === 200;
  };
};
