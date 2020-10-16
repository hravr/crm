import _axios from "./_axios";

export const loginRequest = (data) => {
  return _axios.post("/login", data);
};

export const fetchSklad1 = (token) => {
  return _axios.get("/sklad1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredSklad1 = (sort, from, to, search, token) => {
  let baseUrl = "/sklad1?";
  if (search) {
    baseUrl += `search=${search}&from=${from}&to=${to}`;
  } else {
    baseUrl += `from=${from}&to=${to}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSklad1 = (sklad1, token) => {
  return _axios.post("/sklad1", sklad1, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchSklad1 = (sklad1, id, token) => {
  return _axios.patch(`/sklad1/${id}`, sklad1, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSklad1 = (id, token) => {
  return _axios.delete(`/sklad1/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchWorkers = (token) => {
  return _axios.get("/workers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchWorker = (id, token) => {
  return _axios.get(`/workers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchWorkers = (search, token) => {
  let baseUrl = "/workers?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createWorker = (workers, token) => {
  return _axios.post("/workers", workers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchWorker = (workers, id, token) => {
  return _axios.patch(`/workers/${id}`, workers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteWorker = (id, token) => {
  return _axios.delete(`/workers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchProd = (token) => {
  return _axios.get("/prod", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredProd = (from, to, search, token) => {
  let baseUrl = "/prod?";
  if (search) {
    baseUrl += `search=${search}&from=${from}&to=${to}`;
  } else {
    baseUrl += `from=${from}&to=${to}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProd = (prod, token) => {
  return _axios.post("/prod", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProd = (prod, id, token) => {
  return _axios.patch(`/prod/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProd = (id, token) => {
  return _axios.delete(`/workers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchZpSklad1 = (token) => {
  return _axios.get("/zp_sklad1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchZpSklad1 = (search, token) => {
  let baseUrl = "/zp_sklad1?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createZpSklad1 = (zp_sklad1, token) => {
  return _axios.post("/zp_sklad1", zp_sklad1, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchZpSklad1 = (zp_sklad1, id, token) => {
  return _axios.patch(`/zp_sklad1/${id}`, zp_sklad1, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteZpSklad1 = (id, token) => {
  return _axios.delete(`/zp_sklad1/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchZpSklad2 = (token) => {
  return _axios.get("/zp_sklad2", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchZpSklad2 = (search, token) => {
  let baseUrl = "/zp_sklad2?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createZpSklad2 = (zp_sklad2, token) => {
  return _axios.post("/zp_sklad2", zp_sklad2, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchZpSklad2 = (zp_sklad2, id, token) => {
  return _axios.patch(`/zp_sklad1/${id}`, zp_sklad2, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteZpSklad2 = (id, token) => {
  return _axios.delete(`/zp_sklad2/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchZpSklad3 = (token) => {
  return _axios.get("/zp_sklad3", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchZpSklad3 = (search, token) => {
  let baseUrl = "/zp_sklad3?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createZpSklad3 = (zp_sklad3, token) => {
  return _axios.post("/zp_sklad3", zp_sklad3, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchZpSklad3 = (zp_sklad3, id, token) => {
  return _axios.patch(`/zp_sklad3/${id}`, zp_sklad3, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteZpSklad3 = (id, token) => {
  return _axios.delete(`/zp_sklad3/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchZpSklad4 = (token) => {
  return _axios.get("/zp_sklad4", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchZpSklad4 = (search, token) => {
  let baseUrl = "/zp_sklad4?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createZpSklad4 = (zp_sklad4, token) => {
  return _axios.post("/zp_sklad4", zp_sklad4, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchZpSklad4 = (zp_sklad4, id, token) => {
  return _axios.patch(`/zp_sklad4/${id}`, zp_sklad4, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteZpSklad4 = (id, token) => {
  return _axios.delete(`/zp_sklad4/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
