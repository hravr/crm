import { getToken } from "../../../utils/utils";
import { fetchFilteredZvituZalushok, fetchZvituZalushok } from "../../api/api";
import {
  SET_FILTERED_ZVITU_ZALUSHOK,
  SET_ZVITU_ZALUSHOK,
} from "../actionTypes";

export const getZvituZalushokAction = (day) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetchZvituZalushok(token, day);
      if (response.status === 200) {
        dispatch({ type: SET_ZVITU_ZALUSHOK, zvituZalushok: response.data });
      }
    } catch (e) {
      return false;
    }
  };
};

export const filterZvituZalushokAction = ({ day }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredZvituZalushok(day, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_ZVITU_ZALUSHOK,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_ZVITU_ZALUSHOK,
        filtered: [],
      });
    }
  };
};
