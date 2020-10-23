import { getToken } from "../../../utils/utils";
import {
  createMachineDuymu,
  deleteMachineDuymu,
  fetchMachineDuymu,
  fetchSearchMachineDuymu,
  patchMachineDuymu,
} from "../../api/api";
import {
  ADD_MACHINE_DYUMU,
  DELETE_MACHINE_DYUMU,
  SET_FILTER_MACHINE_DYUMU,
  SET_MACHINE_DYUMU,
} from "../actionTypes";

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

export const filterMachineDuymuAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchMachineDuymu(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTER_MACHINE_DYUMU,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTER_MACHINE_DYUMU,
        filtered: [],
      });
    }
  };
};

export const createMachineDuymuAction = (machineDuymu) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createMachineDuymu(machineDuymu, token);
    if (response.status === 200) {
      dispatch({ type: ADD_MACHINE_DYUMU, token, machineDuymu: response.data });
      return true;
    }
  };
};

export const editMachineDuymuAction = (machineDuymu, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchMachineDuymu(machineDuymu, token, id);
    dispatch({ type: ADD_MACHINE_DYUMU, token });
    return response.status === 200;
  };
};

export const deleteMachineDuymuAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteMachineDuymu(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_MACHINE_DYUMU, id });
    }
    return responce.status === 200;
  };
};
