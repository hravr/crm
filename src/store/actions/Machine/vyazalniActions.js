import { getToken } from "../../../utils/utils";
import {
  createMachineVyazalni,
  deleteMachineVyazalni,
  fetchMachineVyazalni,
  fetchSearchMachineVyazalni,
  patchMachineVyazalni,
} from "../../api/api";
import {
  ADD_MACHINE_VYAZALNI,
  DELETE_MACHINE_VYAZALNI,
  SET_FILTER_MACHINE_VYAZALNI,
  SET_MACHINE_VYAZALNI,
} from "../actionTypes";

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

export const filterMachineVyazalniAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMachineVyazalni(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MACHINE_VYAZALNI,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MACHINE_VYAZALNI,
        filtered: [],
      });
    }
  };
};

export const createMachineVyazalniAction = (machineVyazalni) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createMachineVyazalni(machineVyazalni, token);
    if (response.status === 200) {
      dispatch({
        type: ADD_MACHINE_VYAZALNI,
        token,
        machineVyazalni: response.data,
      });
      return true;
    }
  };
};

export const editMachineVyazalniAction = (machineVyazalni, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchMachineVyazalni(machineVyazalni, token, id);
    dispatch({ type: ADD_MACHINE_VYAZALNI, token });
    return response.status === 200;
  };
};

export const deleteMachineVyazalniAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteMachineVyazalni(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_MACHINE_VYAZALNI, id });
    }
    return responce.status === 200;
  };
};
