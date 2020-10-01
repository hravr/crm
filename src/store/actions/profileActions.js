import { loginRequest } from "../api/api";
import { SET_PROFILE } from "./actionTypes";

// export const loginAction = (data) => {
//   return async (dispatch) => {
//     const response = await loginRequest(data);
//     const { token } = response.data;
//     if (response.status === 200) {
//       document.cookie = `token=${token}`;
//       dispatch({ type: SET_PROFILE, profile: { ...response.data.user } }); //admin => profile
//     } else {
//       dispatch({ type: SET_PROFILE, profile: {} });
//     }

//     return response.status === 200;
//   };
// };
export const loginAction = (data) => {
    return async (dispatch) => {
      const responce = await loginRequest(data);
      if (responce.data !== "") {
        dispatch({
          type: SET_PROFILE,
          token: responce.data.token,
        });
      } else {
        dispatch({ type: SET_PROFILE, token: "" });
      }
      return responce.token;
    };
  };