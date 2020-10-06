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

export const fetchFilteredSklad1 = (searchValue, sortType) => {
  let baseUrl = "/sklad1?";
  if (searchValue) {
    baseUrl += `sort=${searchValue}`;
  }
  if (sortType) {
    baseUrl += `sort=${sortType}`;
  }
  return _axios.get(baseUrl);
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
