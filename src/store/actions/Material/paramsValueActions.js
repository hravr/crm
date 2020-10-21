import { getToken } from "../../../utils/utils";
import { fetchMaterialParamsValue } from "../../api/api";
import { SET_MATERIALS_PARAMS_VALUE } from "../actionTypes";

export const getMaterialParamsValueAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialParamsValue(token);
    if (response.status === 200) {
      dispatch({
        type: SET_MATERIALS_PARAMS_VALUE,
        materiaParamsValue: response.data,
      });
    }
    return response.status === 200;
  };
};
