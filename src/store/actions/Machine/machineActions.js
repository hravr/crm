import { getToken } from "../../../utils/utils";
import {
  createMachine,
  deleteMachine,
  fetchMachine,
  fetchSearchMachine,
  fetchSingleMachine,
  patchMachine,
} from "../../api/api";
import {
  ADD_MACHINE,
  DELETE_MACHINE,
  SET_MACHINE,
  SET_SINGLE_MACHINE,
  SET_FILTER_MACHINE,
} from "../actionTypes";

export const getMachineAction = () => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchMachine(token);
      if (response.status === 200) {
        dispatch({ type: SET_MACHINE, machines: response.data });
        return response.status === 200;
      }
    } catch (e) {
      return false;
    }
  };
};

export const getSingleMachineAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchSingleMachine(id, token);
      dispatch({ type: SET_SINGLE_MACHINE, singleMachine: response.data });
    } catch (e) {
      return false;
    }
  };
};

export const searchMachineAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMachine(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MACHINE,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MACHINE,
        filtered: [],
      });
    }
  };
};

export const createMachineAction = (machine) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await createMachine(machine, token);
      if (response.status === 200) {
        dispatch({ type: ADD_MACHINE, token, machine: response.data });
        return true;
      }
    } catch (e) {
      return false;
    }
  };
};

export const editMachineAction = (machines, id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await patchMachine(id, machines, token);
      dispatch({ type: ADD_MACHINE, token });
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};

export const deleteMachineAction = (id) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await deleteMachine(id, token);
      if (response.status === 200) {
        dispatch({ type: DELETE_MACHINE, id, machines: response.data });
      }
      return response.status === 200;
    } catch (e) {
      return false;
    }
  };
};
