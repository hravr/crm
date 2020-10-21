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

export const fetchFilteredSklad1 = (from, to, search, token) => {
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

export const fetchProdArticle = (token) => {
  return _axios.get("/prod_article", {
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

export const patchProdArticle = (prod, id, token) => {
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

export const patchProdAsortument = (prodAsortument, id, token) => {
  return _axios.patch(`/prod_asortument/${id}`, prodAsortument, {
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

export const patchProdClass = (prod, id, token) => {
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

export const patchProdColor = (prod, id, token) => {
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

export const patchProdImage = (prod, id, token) => {
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

export const patchProdSezon = (prod, id, token) => {
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

export const patchProdSize = (prod, id, token) => {
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

export const patchProdType = (prod, id, token) => {
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
export const fetchPrajaRozhid = (token) => {
  return _axios.get("/priaga_dilanka_rozxody", {
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
export const fetchPrajaTovtshina = (token) => {
  return _axios.get("/priaga_tovtshina", {
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
export const fetchPrajaVendor = (token) => {
  return _axios.get("/priaga_vendor", {
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
export const fetchMachineGolku = (token) => {
  return _axios.get("/machines_golku", {
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
export const fetchMachineVyazalni = (token) => {
  return _axios.get("/machines_vyazalni", {
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
export const fetchMaterialVendor = (token) => {
  return _axios.get("/materials_vendor", {
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
export const fetchMaterialType = (token) => {
  return _axios.get("/materials_type", {
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
export const fetchMaterialParamsValue = (token) => {
  return _axios.get("/materials_params_value", {
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
// export const fetchOperations = (id, token) => {
//   return _axios.get(`/operations/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };

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

export const patchOperations = (operations, id, token) => {
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

export const fetchFilteredZvitu = (from, to, search, token) => {
  let baseUrl = "/zvitu?";
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

export const fetchFilteredZvituRozxid = (from, to, search, token) => {
  let baseUrl = "/zvitu_rozxid?";
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

export const deleteZvituRozxid = (id, token) => {
  return _axios.delete(`/zvitu_rozxid/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
