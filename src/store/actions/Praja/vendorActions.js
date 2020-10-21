import { getToken } from "../../../utils/utils";
import { fetchPrajaVendor } from "../../api/api";
import { SET_PRAJA_VENDOR } from "../actionTypes";

export const getPrajaVendorAction = () => {
  return async (dispatch) => {
    const token = getToken();
    const response = await fetchPrajaVendor(token);
    if (response.status === 200) {
      dispatch({ type: SET_PRAJA_VENDOR, prajaVendor: response.data });
    }
    return response.status === 200;
  };
};
