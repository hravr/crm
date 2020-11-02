import {getToken} from "../../utils/utils";
import {fetchZpSklad4} from "../api/api";
import {SET_ZP_SKLAD4} from "./actionTypes";

export const getZpSklad4Action = () => {
    return async (dispatch) => {
        const token = getToken();
        const response = await fetchZpSklad4(token);
        if (response.status === 200) {
            dispatch({type: SET_ZP_SKLAD4, zpsklad4: response.data});
        }
        return response.status === 200;
    };
};
