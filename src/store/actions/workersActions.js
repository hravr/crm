import { getToken } from "../../utils/utils";
import {
  fetchSearchWorkers,
  fetchWorkers,
  createWorker,
  patchWorker,
  deleteWorker,
} from "../api/api";
import {
  ADD_WORKER,
  DELETE_WORKER,
  SET_FILTERED_WORKERS,
  SET_WORKERS,
} from "./actionTypes";

export const getWorkersAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchWorkers(token);
    if (response.status === 200) {
      dispatch({ type: SET_WORKERS, workers: response.data });
    }
    return response.status === 200;
  };
};

export const searchWorkersAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchWorkers(search, token);
    console.log(response.data, "!!!!!!!!!!!!!!!!!!!!!!!!!");
    if (response?.data?.history) {
      dispatch({
        type: SET_FILTERED_WORKERS,
        filtered: response.data.history,
      });
    } else {
      dispatch({
        type: SET_FILTERED_WORKERS,
        filtered: [],
      });
    }
  };
};

export const createWorkerAction = (workers) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createWorker(workers, token);
    if (response.status === 200) {
      dispatch({ type: ADD_WORKER, token });
      return true;
    }
  };
};

export const editWorkerAction = (workers, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchWorker(workers, token, id);
    dispatch({ type: ADD_WORKER, token });
    return response.status === 200;
  };
};

export const deleteWorkerAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteWorker(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_WORKER, id });
    }
    return responce.status === 200;
  };
};
