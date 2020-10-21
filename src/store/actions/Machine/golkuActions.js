import { getToken } from "../../../utils/utils";
import { fetchMachineGolku } from "../../api/api";
import { SET_MACHINE_GOLKU } from "../actionTypes";

export const getMachineGolkuAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMachineGolku(token);
    if (response.status === 200) {
      dispatch({ type: SET_MACHINE_GOLKU, machineGolku: response.data });
    }
    return response.status === 200;
  };
};
