import axios from "axios";

const _axios = axios.create({
  baseURL: "http://localhost/api/v1",
});

export default _axios;
