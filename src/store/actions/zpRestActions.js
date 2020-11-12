import {getToken} from "../../utils/utils";
import {fetchZpRest} from "../api/api";
import {SET_ZP_REST} from "./actionTypes";

export const getZpRestAction = () => {
    return async (dispatch) => {
        const token = getToken();
        const response = await fetchZpRest(token);
        if (response.status === 200) {
            dispatch({type: SET_ZP_REST, zp_rest: response.data});
        }
        return response.status === 200;
    };
};
