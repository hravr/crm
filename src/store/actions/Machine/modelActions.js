import { getToken } from "../../../utils/utils";
import {
  createMachineModel,
  deleteMachineModel,
  fetchMachineModel,
  fetchSearchMachineModel,
  patchMachineModel,
} from "../../api/api";
import {
  ADD_MACHINE_MODEL,
  DELETE_MACHINE_MODEL,
  SET_FILTER_MACHINE_MODEL,
  SET_MACHINE_MODEL,
} from "../actionTypes";

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

export const filterMachineModelAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMachineModel(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MACHINE_MODEL,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MACHINE_MODEL,
        filtered: [],
      });
    }
  };
};

export const createMachineModelAction = (machineModel) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createMachineModel(machineModel, token);
    if (response.status === 200) {
      dispatch({ type: ADD_MACHINE_MODEL, token, machineModel: response.data });
      return true;
    }
  };
};

export const editMachineModelAction = (machineModel, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchMachineModel(machineModel, token, id);
    dispatch({ type: ADD_MACHINE_MODEL, token });
    return response.status === 200;
  };
};

export const deleteMachineModelAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteMachineModel(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_MACHINE_MODEL, id });
    }
    return responce.status === 200;
  };
};
