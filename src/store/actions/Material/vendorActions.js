import { getToken } from "../../../utils/utils";
import { fetchMaterialVendor } from "../../api/api";
import { SET_MATERIALS_VENDOR } from "../actionTypes";

export const getMaterialVendorAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchMaterialVendor(token);
    if (response.status === 200) {
      dispatch({ type: SET_MATERIALS_VENDOR, materialVendor: response.data });
    }
    return response.status === 200;
  };
};
