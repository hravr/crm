import { getToken } from "../../../utils/utils";
import { fetchMaterialType } from "../../api/api";
import { SET_MATERIALS_TYPE } from "../actionTypes";

export const getMaterialTypeAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialType(token);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS_TYPE, materialType: response.data });
    }
    return response.status === 200;
  };
};
