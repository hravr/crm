import { getToken } from "../../../utils/utils";
import { fetchMachineVyazalni } from "../../api/api";
import { SET_MACHINE_VYAZALNI } from "../actionTypes";

export const getMachineVyazalniAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMachineVyazalni(token);
    if (response.status === 200) {
      dispatch({ type: SET_MACHINE_VYAZALNI, machineVyazalni: response.data });
    }
    return response.status === 200;
  };
};
