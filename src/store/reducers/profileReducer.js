import { SET_PROFILE } from "../actions/actionTypes";

const initialstate = { email: "", password: "", token: "" };

export default (state = initialstate, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case SET_PROFILE:
//       return {
//         ...state,
//         email: action.profile.email,
//         password: action.profile.password,
//       };
//     // case LOGOUT:
//     //   return {
//     //     initialState,
//     //   };
//     default:
//       return state;
//   }
// };
