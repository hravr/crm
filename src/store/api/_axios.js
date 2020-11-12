import axios from "axios";

const _axios = axios.create({
  // baseURL: "https://crm-frank.herokuapp.com/api/v1",
  baseURL: "http://192.168.1.9/api/v1",
});

export default _axios;
