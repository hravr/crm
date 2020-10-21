import { getToken } from "../../../utils/utils";
import { fetchMaterialParams } from "../../api/api";
import { SET_MATERIALS_PARAMS } from "../actionTypes";

export const getMaterialParamsAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialParams(token);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS_PARAMS, materialParams: response.data });
    }
    return response.status === 200;
  };
};
