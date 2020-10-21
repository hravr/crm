import { getToken } from "../../../utils/utils";
import { fetchMachineModel } from "../../api/api";
import { SET_MACHINE_MODEL } from "../actionTypes";

export const getMachineModelAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMachineModel(token);
    if (response.status === 200) {
      dispatch({ type: SET_MACHINE_MODEL, machineModel: response.data });
    }
    return response.status === 200;
  };
};
