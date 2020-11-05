import {getToken} from "../../../utils/utils";
import {SET_FILTERED_PRIAGA_ZALUSHOK, SET_PRIAGA_ZALUSHOK} from "../actionTypes";
import {fetchFilteredPriagaZalushok, fetchPriagaZalushok} from "../../api/api";

export const getPriagaZalushokAction = (day) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPriagaZalushok(token, day);
    if (response.status === 200) {
      dispatch({type: SET_PRIAGA_ZALUSHOK, zvituZalushok: response.data});
    }
  };
};

export const filterPriagaZalushokAction = ({day}) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredPriagaZalushok(day, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_PRIAGA_ZALUSHOK,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_PRIAGA_ZALUSHOK,
        filtered: [],
      });
    }
  };
};
