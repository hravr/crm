import { getToken } from "../../utils/utils";
import {
  fetchSearchWorkers,
  fetchWorkers,
  createWorker,
  patchWorker,
  deleteWorker,
  fetchWorker,
} from "../api/api";
import {
  ADD_WORKER,
  DELETE_WORKER,
  SET_FILTERED_WORKERS,
  SET_SINGLE_WORKER,
  SET_WORKERS,
} from "./actionTypes";

export const getWorkersAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchWorkers(token, id);
    if (response.status === 200) {
      dispatch({ type: SET_WORKERS, workers: response.data });
    }
    return response.status === 200;
  };
};

export const getSingleWorkerAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchWorker(id, token);
    dispatch({ type: SET_SINGLE_WORKER, singleWorker: response.data });
  };
};

export const searchWorkersAction = ({ search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchSearchWorkers(search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_WORKERS,
        filtered: response.data,
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
      dispatch({ type: ADD_WORKER, token, workers: response.data });
      return true;
    }
  };
};

export const editWorkerAction = (workers, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchWorker(workers, token, id);
    dispatch({ type: ADD_WORKER, token, workers: response.data });
    return response.status === 200;
  };
};

export const deleteWorkerAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await deleteWorker(id, token);
    if (response.status === 200) {
      dispatch({ type: DELETE_WORKER, id, workers: response.data });
    }
    return response.status === 200;
  };
};
