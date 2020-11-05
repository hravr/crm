import { getToken } from "../../../utils/utils";
import {
  fetchFilteredMaterialsZalushok,
  fetchMaterialsZalushok,
} from "../../api/api";
import {
  SET_FILTERED_MATERIALS_ZALUSHOK,
  SET_MATERIALS_ZALUSHOK
} from "../actionTypes";

export const getMaterialsZalushokAction = (day) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialsZalushok(token, day);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS_ZALUSHOK, zvituZalushok: response.data });
    }
  };
};

export const filterMaterialsZalushokAction = ({ day }) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchFilteredMaterialsZalushok(day, token);
    if (response?.data) {
      dispatch({
        type: SET_FILTERED_MATERIALS_ZALUSHOK,
        filtered: response.data,
      });
    } else {
      dispatch({
        type: SET_FILTERED_MATERIALS_ZALUSHOK,
        filtered: [],
      });
    }
  };
};
