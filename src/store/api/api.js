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
export const fetchSingleSklad1 = (id, token) => {
  return _axios.get(`/sklad1/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleSklad2 = (id, token) => {
  return _axios.get(`/sklad2/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleSklad3 = (id, token) => {
  return _axios.get(`/sklad3/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleSklad4 = (id, token) => {
  return _axios.get(`/sklad4/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSklad1Zalushok = (token, day) => {
  return _axios.get(`/sklad1_zalushok?day=${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredSklad1 = (from, to, search, token) => {
  let baseUrl = "/sklad1?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  if (from) {
    baseUrl += `&from=${from}`;
  }
  if (to) {
    baseUrl += `&to=${to}`;
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
export const fetchSklad2 = (token) => {
  return _axios.get("/sklad2", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredSklad2 = (from, to, search, token) => {
  let baseUrl = "/sklad2?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  if (from) {
    baseUrl += `&from=${from}`;
  }
  if (to) {
    baseUrl += `&to=${to}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSklad2 = (sklad2, token) => {
  return _axios.post("/sklad2", sklad2, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchSklad2 = (sklad2, id, token) => {
  return _axios.patch(`/sklad2/${id}`, sklad2, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSklad2 = (id, token) => {
  return _axios.delete(`/sklad2/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSklad3 = (token) => {
  return _axios.get("/sklad3", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredSklad3 = (from, to, search, token) => {
  let baseUrl = "/sklad3?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  if (from) {
    baseUrl += `&from=${from}`;
  }
  if (to) {
    baseUrl += `&to=${to}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSklad3 = (sklad3, token) => {
  return _axios.post("/sklad3", sklad3, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchSklad3 = (sklad3, id, token) => {
  return _axios.patch(`/sklad3/${id}`, sklad3, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSklad3 = (id, token) => {
  return _axios.delete(`/sklad3/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSklad4 = (token) => {
  return _axios.get("/sklad4", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredSklad4 = (from, to, search, token) => {
  let baseUrl = "/sklad4?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  if (from) {
    baseUrl += `&from=${from}`;
  }
  if (to) {
    baseUrl += `&to=${to}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createSklad4 = (sklad4, token) => {
  return _axios.post("/sklad4", sklad4, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchSklad4 = (sklad4, id, token) => {
  return _axios.patch(`/sklad3/${id}`, sklad4, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSklad4 = (id, token) => {
  return _axios.delete(`/sklad4/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSklad1to2 = (token, data) => {
  return _axios.post("/sklad1_2", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSklad1to4 = (token, data) => {
  return _axios.post("/sklad1_4", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSklad1to3 = (token, data) => {
  return _axios.post("/sklad1_3", data, {
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

export const patchWorker = (workers, token, id) => {
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

export const fetchZpSklad1 = (token) => {
  return _axios.get("/zp_sklad1", {
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

export const fetchZpSklad3 = (token) => {
  return _axios.get("/zp_sklad3", {
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

export const fetchProdArticle = (token) => {
  return _axios.get("/prod_article", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleProdArticle = (id, token) => {
  return _axios.get(`/prod_article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredProdArticle = (search, token) => {
  let baseUrl = "/prod_article?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdArticle = (prod, token) => {
  return _axios.post("/prod_article", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdArticle = (id, token, prod) => {
  return _axios.patch(`/prod_article/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdArticle = (id, token) => {
  return _axios.delete(`/prod_article/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchProdAsortument = (token) => {
  return _axios.get("/prod_asortument", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleProdAsortument = (id, token) => {
  return _axios.get(`/prod_asortument/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredProdAsortument = (search, token) => {
  let baseUrl = "/prod_asortument?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdAsortument = (prodAsortument, token) => {
  return _axios.post("/prod_asortument", prodAsortument, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdAsortument = (id, token, prod) => {
  return _axios.patch(`/prod_asortument/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdAsortument = (id, token) => {
  return _axios.delete(`/prod_asortument/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchProdClass = (token) => {
  return _axios.get("/prod_class", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleProdClass = (id, token) => {
  return _axios.get(`/prod_class/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredProdClass = (search, token) => {
  let baseUrl = "/prod_class?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdClass = (prod, token) => {
  return _axios.post("/prod_class", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdClass = (id, token, prod) => {
  return _axios.patch(`/prod_class/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdClass = (id, token) => {
  return _axios.delete(`/prod_class/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchProdColor = (token) => {
  return _axios.get("/prod_color", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleProdColor = (id, token) => {
  return _axios.get(`/prod_color/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredProdColor = (search, token) => {
  let baseUrl = "/prod_color?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdColor = (prod, token) => {
  return _axios.post("/prod_color", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdColor = (id, token, prod) => {
  return _axios.patch(`/prod_color/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdColor = (id, token) => {
  return _axios.delete(`/prod_color/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchProdImage = (token) => {
  return _axios.get("/prod_image", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleProdImage = (id, token) => {
  return _axios.get(`/prod_image/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchFilteredProdImage = (search, token) => {
  let baseUrl = "/prod_image?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdImage = (prod, token) => {
  return _axios.post("/prod_image", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdImage = (id, token, prod) => {
  return _axios.patch(`/prod_image/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdImage = (id, token) => {
  return _axios.delete(`/prod_image/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchProdSezon = (token) => {
  return _axios.get("/prod_season", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleProdSezon = (id, token) => {
  return _axios.get(`/prod_season/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredProdSezon = (search, token) => {
  let baseUrl = "/prod_season?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdSezon = (prod, token) => {
  return _axios.post("/prod_season", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdSezon = (id, token, prod) => {
  return _axios.patch(`/prod_season/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdSezon = (id, token) => {
  return _axios.delete(`/prod_season/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchProdSize = (token) => {
  return _axios.get("/prod_size", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleProdSize = (id, token) => {
  return _axios.get(`/prod_size/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchFilteredProdSize = (search, token) => {
  let baseUrl = "/prod_size?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdSize = (prod, token) => {
  return _axios.post("/prod_size", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdSize = (id, token, prod) => {
  return _axios.patch(`/prod_size/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdSize = (id, token) => {
  return _axios.delete(`/prod_size/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchProdType = (token) => {
  return _axios.get("/prod_type", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleProdType = (id, token) => {
  return _axios.get(`/prod_type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredProdType = (search, token) => {
  let baseUrl = "/prod_type?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createProdType = (prod, token) => {
  return _axios.post("/prod_type", prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchProdType = (id, token, prod) => {
  return _axios.patch(`/prod_type/${id}`, prod, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProdType = (id, token) => {
  return _axios.delete(`/prod_type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPrajaColor = (token) => {
  return _axios.get("/priaga_color", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSinglePrajaColor = (id, token) => {
  return _axios.get(`/priaga_color/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchPrajaColor = (search, token) => {
  let baseUrl = "/priaga_color?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createPrajaColor = (prajaColor, token) => {
  return _axios.post("/priaga_color", prajaColor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchPrajaColor = (id, token, prajaColor) => {
  return _axios.patch(`/priaga_color/${id}`, prajaColor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePrajaColor = (id, token) => {
  return _axios.delete(`/priaga_color/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPrajaRozhid = (token) => {
  return _axios.get("/priaga_dilanka_rozxody", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSinglePrajaRozhid = (id, token) => {
  return _axios.get(`/priaga_dilanka_rozxody/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchPrajaRozhid = (search, token) => {
  let baseUrl = "/priaga_dilanka_rozxody?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createPrajaRozhid = (prajaRozhid, token) => {
  return _axios.post("/priaga_dilanka_rozxody", prajaRozhid, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchPrajaRozhid = (id, token, prajaRozhid) => {
  return _axios.patch(`/priaga_dilanka_rozxody/${id}`, prajaRozhid, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePrajaRozhid = (id, token) => {
  return _axios.delete(`/priaga_dilanka_rozxody/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPrajaSurovuna = (token) => {
  return _axios.get("/priaga_surovuna", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSinglePrajaSurovuna = (id, token) => {
  return _axios.get(`/priaga_surovuna/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSearchPrajaSurovuna = (search, token) => {
  let baseUrl = "/priaga_surovuna?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createPrajaSurovuna = (prajaSurovuna, token) => {
  return _axios.post("/priaga_surovuna", prajaSurovuna, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchPrajaSurovuna = (id, token, prajaSurovuna) => {
  return _axios.patch(`/priaga_surovuna/${id}`, prajaSurovuna, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePrajaSurovuna = (id, token) => {
  return _axios.delete(`/priaga_surovuna/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPrajaTovtshina = (token) => {
  return _axios.get("/priaga_tovtshina", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSinglePrajaTovtshina = (id, token) => {
  return _axios.get(`/priaga_tovtshina/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchPrajaTovtshina = (search, token) => {
  let baseUrl = "/priaga_tovtshina?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createPrajaTovtshina = (prajaTovtshina, token) => {
  return _axios.post("/priaga_tovtshina", prajaTovtshina, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchPrajaTovtshina = (id, token, prajaTovtshina) => {
  return _axios.patch(`/priaga_tovtshina/${id}`, prajaTovtshina, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePrajaTovtshina = (id, token) => {
  return _axios.delete(`/priaga_tovtshina/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPrajaType = (token) => {
  return _axios.get("/priaga_type", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSinglePrajaType = (id, token) => {
  return _axios.get(`/priaga_type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchPrajaType = (search, token) => {
  let baseUrl = "/priaga_type?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createPrajaType = (prajaType, token) => {
  return _axios.post("/priaga_type", prajaType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchPrajaType = (id, token, prajaType) => {
  return _axios.patch(`/priaga_type/${id}`, prajaType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePrajaType = (id, token) => {
  return _axios.delete(`/priaga_type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchPrajaVendor = (token) => {
  return _axios.get("/priaga_vendor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSinglePrajaVendor = (id, token) => {
  return _axios.get(`/priaga_vendor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSearchPrajaVendor = (search, token) => {
  let baseUrl = "/priaga_vendor?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createPrajaVendor = (prajaVendor, token) => {
  return _axios.post("/priaga_vendor", prajaVendor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchPrajaVendor = (id, token, prajaVendor) => {
  return _axios.patch(`/priaga_vendor/${id}`, prajaVendor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePrajaVendor = (id, token) => {
  return _axios.delete(`/priaga_vendor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMachine = (token) => {
  return _axios.get("/machines", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleMachine = (id, token) => {
  return _axios.get(`/machines/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchMachine = (search, token) => {
  let baseUrl = "/machines?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMachine = (machines, token) => {
  return _axios.post("/machines", machines, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMachine = (id, machines, token) => {
  return _axios.patch(`/machines/${id}`, machines, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMachine = (id, token) => {
  return _axios.delete(`/machines/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMachineModel = (token) => {
  return _axios.get("/machines_model", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleMachineModel = (id, token) => {
  return _axios.get(`/machines_model/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchMachineModel = (search, token) => {
  let baseUrl = "/machines_model?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMachineModel = (machineModel, token) => {
  return _axios.post("/machines_model", machineModel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMachineModel = (id, token, machineModel) => {
  return _axios.patch(`/machines_model/${id}`, machineModel, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMachineModel = (id, token) => {
  return _axios.delete(`/machines_model/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMachineGolku = (token) => {
  return _axios.get("/machines_golku", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleMachineGolku = (id, token) => {
  return _axios.get(`/machines_golku/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchMachineGolku = (search, token) => {
  let baseUrl = "/machines_golku?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMachineGolku = (machineGolku, token) => {
  return _axios.post("/machines_golku", machineGolku, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMachineGolku = (id, token, machineGolku) => {
  return _axios.patch(`/machines_golku/${id}`, machineGolku, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMachineGolku = (id, token) => {
  return _axios.delete(`/machines_golku/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMachineDuymu = (token) => {
  return _axios.get("/machines_duymu", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleMachineDuymu = (id, token) => {
  return _axios.get(`/machines_duymu/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchMachineDuymu = (search, token) => {
  let baseUrl = "/machines_duymu?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMachineDuymu = (machineDuymu, token) => {
  return _axios.post("/machines_duymu", machineDuymu, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMachineDuymu = (id, token, machineDuymu) => {
  return _axios.patch(`/machines_duymu/${id}`, machineDuymu, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMachineDuymu = (id, token) => {
  return _axios.delete(`/machines_duymu/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMachineVyazalni = (token) => {
  return _axios.get("/machines_vyazalni", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleMachineVyazalni = (id, token) => {
  return _axios.get(`/machines_vyazalni/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchMachineVyazalni = (search, token) => {
  let baseUrl = "/machines_vyazalni?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMachineVyazalni = (machineVyazalni, token) => {
  return _axios.post("/machines_vyazalni", machineVyazalni, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMachineVyazalni = (id, token, machineVyazalni) => {
  return _axios.patch(`/machines_vyazalni/${id}`, machineVyazalni, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMachineVyazalni = (id, token) => {
  return _axios.delete(`/machines_vyazalni/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchRoztsinka = (token) => {
  return _axios.get("/roztsinka", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleRoztsinka = (id, token) => {
  return _axios.get(`/roztsinka/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredRoztsinka = (search, token) => {
  let baseUrl = "/roztsinka?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createRoztsinka = (roztsinka, token) => {
  return _axios.post("/roztsinka", roztsinka, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchRoztsinka = (id, token, roztsinka) => {
  return _axios.patch(`/roztsinka/${id}`, roztsinka, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteRoztsinka = (id, token) => {
  return _axios.delete(`/roztsinka/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMaterialVendor = (token) => {
  return _axios.get("/materials_vendor", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleMaterialVendor = (id, token) => {
  return _axios.get(`/materials_vendor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchMaterialVendor = (search, token) => {
  let baseUrl = "/materials_vendor?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMaterialVendor = (materialVendor, token) => {
  return _axios.post("/materials_vendor", materialVendor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMaterialVendor = (id, token, materialVendor) => {
  return _axios.patch(`/materials_vendor/${id}`, materialVendor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMaterialVendor = (id, token) => {
  return _axios.delete(`/materials_vendor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMaterialRozhid = (token) => {
  return _axios.get("/materials_dilanka_rozxody", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleMaterialRozhid = (id, token) => {
  return _axios.get(`/materials_dilanka_rozxody/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchMaterialRozhid = (search, token) => {
  let baseUrl = "/materials_dilanka_rozxody?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMaterialRozhid = (materialRozhid, token) => {
  return _axios.post("/materials_dilanka_rozxody", materialRozhid, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMaterialRozhid = (id, token, materialRozhid) => {
  return _axios.patch(`/materials_dilanka_rozxody/${id}`, materialRozhid, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMaterialRozhid = (id, token) => {
  return _axios.delete(`/materials_dilanka_rozxody/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchMaterialType = (token) => {
  return _axios.get("/materials_type", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleMaterialType = (id, token) => {
  return _axios.get(`/materials_type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSearchMaterialType = (search, token) => {
  let baseUrl = "/materials_type?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMaterialType = (materialType, token) => {
  return _axios.post("/materials_type", materialType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMaterialType = (id, materialType, token) => {
  return _axios.patch(`/materials_type/${id}`, materialType, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMaterialType = (id, token) => {
  return _axios.delete(`/materials_type/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMaterialParams = (token) => {
  return _axios.get("/materials_params", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleMaterialParams = (id, token) => {
  return _axios.get(`/materials_params/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSearchMaterialParams = (search, token) => {
  let baseUrl = "/materials_params?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMaterialParams = (materialParams, token) => {
  return _axios.post("/materials_params", materialParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchMaterialParams = (id, token, materialParams) => {
  return _axios.patch(`/materials_params/${id}`, materialParams, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMaterialParams = (id, token) => {
  return _axios.delete(`/materials_params/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMaterialParamsValue = (token) => {
  return _axios.get("/materials_params_value", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleMaterialParamsValue = (id, token) => {
  return _axios.get(`/materials_params_value/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSearchMaterialParamsValue = (search, token) => {
  let baseUrl = "/materials_params_value?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createMaterialParamsValue = (materialParamsValue, token) => {
  return _axios.post("/materials_params_value", materialParamsValue, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function patchMaterialParamsValue(id, materialParamsValue, token) {
  console.log("args ===", arguments);
  return _axios.patch(`/materials_params_value/${id}`, materialParamsValue, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const deleteMaterialParamsValue = (id, token) => {
  return _axios.delete(`/materials_params_value/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchOperations = (token) => {
  return _axios.get("/operations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleOperations = (id, token) => {
  return _axios.get(`/operations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSearchOperations = (search, token) => {
  let baseUrl = "/operations?";
  if (search) {
    baseUrl += `search=${search}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Baer ${token}`,
    },
  });
};

export const createOperations = (operations, token) => {
  return _axios.post("/operations", operations, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchOperations = (id, token, operations) => {
  return _axios.patch(`/operations/${id}`, operations, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteOperations = (id, token) => {
  return _axios.delete(`/operations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchZvitu = (token) => {
  return _axios.get("/zvitu", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleZvitu = (id, token) => {
  return _axios.get(`/zvitu/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredZvitu = (from, to, operationId, token) => {
  let baseUrl = "/zvitu?";
  if (operationId) {
    baseUrl += `operationId=${operationId}`;
  }
  if (from) {
    baseUrl += `&from=${from}`;
  }
  if (to) {
    baseUrl += `&to=${to}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createZvitu = (zvitu, token) => {
  return _axios.post("/zvitu", zvitu, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchZvitu = (id, token, zvitu) => {
  return _axios.patch(`/zvitu/${id}`, zvitu, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteZvitu = (id, token) => {
  return _axios.delete(`/zvitu/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchZvituRozxid = (token) => {
  return _axios.get("/zvitu_rozxid", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchSingleZvituRozxid = (id, token) => {
  return _axios.get(`/zvitu_rozxid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFilteredZvituRozxid = (from, to, operationId, token) => {
  console.log("fetch here");
  let baseUrl = "/zvitu_rozxid?";
  if (operationId) {
    baseUrl += `operationId=${operationId}`;
  }
  if (from) {
    baseUrl += `&from=${from}`;
  }
  if (to) {
    baseUrl += `&to=${to}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createZvituRozxid = (zvituRozxid, token) => {
  return _axios.post("/zvitu_rozxid", zvituRozxid, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const patchZvituRozxid = (id, token, zvituRozxid) => {
  return _axios.patch(`/zvitu_rozxid/${id}`, zvituRozxid, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteZvituRozxid = (id, token) => {
  return _axios.delete(`/zvitu_rozxid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchZvituZalushok = (token) => {
  const day = new Date();
  return _axios.get(`/zvitu_zalushok?day=${day}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchFilteredZvituZalushok = (day, token) => {
  let baseUrl = "/zvitu_zalushok?";
  if (day) {
    baseUrl += `day=${day}`;
  }
  return _axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
