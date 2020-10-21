import { getToken } from "../../../utils/utils";
import {
  deleteZvituRozxid,
  fetchFilteredZvituRozxid,
  fetchZvituRozxid,
} from "../../api/api";
import {
  DELETE_ZVITU_ROZXID,
  SET_FILTERED_ZVITU_ROZXID,
  SET_ZVITU_ROZXID,
} from "../actionTypes";

export const getZvituRozxidAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchZvituRozxid(token);
    if (response.status === 200) {
      dispatch({ type: SET_ZVITU_ROZXID, zvituRozxid: response.data });
    }
  };
};

export const filterZvituRoxidAction = ({ from, to, search }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredZvituRozxid(from, to, search, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_ZVITU_ROZXID,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_ZVITU_ROZXID,
        filtered: [],
      });
    }
  };
};
export const deleteZvituRoxidAction = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteZvituRozxid(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_ZVITU_ROZXID, id });
    }
    return responce.status === 200;
  };
};
