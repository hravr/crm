import { getToken } from "../../../utils/utils";
import {
  createMachineGolku,
  deleteMachineGolku,
  fetchMachineGolku,
  fetchSearchMachineGolku,
  patchMachineGolku,
} from "../../api/api";
import {
  ADD_MACHINE_GOLKU,
  DELETE_MACHINE_GOLKU,
  SET_FILTER_MACHINE_GOLKU,
  SET_MACHINE_GOLKU,
} from "../actionTypes";

export const getMachineGolkuAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchMachineGolku(token);
      if (response.status === 200) {
        dispatch({ type: SET_MACHINE_GOLKU, machineGolku: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const filterMachineGolkuAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMachineGolku(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MACHINE_GOLKU,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MACHINE_GOLKU,
        filtered: [],
      });
    }
  };
};

export const createMachineGolkuAction = (machineGolku) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createMachineGolku(machineGolku, token);
      if (response.status === 200) {
        dispatch({
          type: ADD_MACHINE_GOLKU,
          token,
          machineGolku: response.data,
        });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const deleteMachineGolkuAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await deleteMachineGolku(id, token);
      if (response.status === 200) {
        dispatch({
          type: DELETE_MACHINE_GOLKU,
          id,
          machineGolku: response.data,
        });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};
