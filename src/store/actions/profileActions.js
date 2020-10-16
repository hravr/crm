import { loginRequest } from "../api/api";
import { LOGOUT, SET_PROFILE } from "./actionTypes";

export const loginAction = (data) => {
  return async (dispatch) => {
    const response = await loginRequest(data);
    const { token } = response.data;
    if (response.status === 200) {
      document.cookie = `token=${token} `;
      dispatch({
        type: SET_PROFILE,
        token: response.data.token,
        // user: { ...response.data.user }
      });
    } else {
      dispatch({
        type: SET_PROFILE,
        token: "",
        // user: {}
      });
    }
    return response.status === 200;
  };
};

export const logoutAction = () => {
  document.cookie = "token=''; expires=Thu, 18 Dec 2013 12:00:00 UTC";
  document.cookie = "aToken=''; expires=Thu, 18 Dec 2013 12:00:00 UTC";
  return {
    type: LOGOUT,
  };
};
