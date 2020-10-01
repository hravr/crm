import axios from "axios";

const _axios = axios.create({
  baseURL: "localhost/api/v1",
});

export default _axios;
