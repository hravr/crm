import axios from "axios";

const _axios = axios.create({
  // baseURL: "https://crm-frank.herokuapp.com/api/v1",
  baseURL: "http://localhost/api/v1",
});

export default _axios;
