import { getToken } from "../../../utils/utils";
import { deleteZvitu, fetchFilteredZvitu, fetchZvitu } from "../../api/api";
import { DELETE_ZVITU, SET_FILTERED_ZVITU, SET_ZVITU } from "../actionTypes";

export const getZvituAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZvitu(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZVITU, zvitu: response.data });
    }
  };
};

export const filterZvituAction = ({ from, to, search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredZvitu(from, to, search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_ZVITU,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_ZVITU,
        filtered: [],
      });
    }
  };
};

export const deleteZvituAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteZvitu(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_ZVITU, id });
    }
    return responce.status === 200;
  };
};
