import _axios from "./_axios";

export const loginRequest = (data) => {
  return _axios.post("/login", data); // login => data
};
// export const loginRequest = (data) => {
//   return _axios.post("/login", data).catch((e) => e.response);
// };
