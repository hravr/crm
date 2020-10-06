import { getToken } from "../../utils/utils";
import {
  createSklad1,
  deleteSklad1,
  fetchFilteredSklad1,
  fetchSklad1,
  patchSklad1,
} from "../api/api";
import {
  SET_SKLAD1,
  SET_FILTERED_SKLAD1,
  SET_SEARCH_VALUE,
  ADD_SKLAD1,
  DELETE_SKLAD1
} from "./actionTypes";

export const getSklad1Action = () => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await fetchSklad1(token);
    if (responce.status === 200) {
      dispatch({ type: SET_SKLAD1, sklad1: responce.data });
    }
    return responce.status === 200;
  };
};

export const filterSklad1Action = (sortType) => {
  return async (dispatch) => {
    const responce = await fetchFilteredSklad1(sortType);
    if (responce?.data?.sklad1) {
      dispatch({
        type: SET_FILTERED_SKLAD1,
        sklad1: responce.data.sklad1,
      });
    } else {
      dispatch({
        type: SET_SEARCH_VALUE,
        sklad1: [],
      });
    }
  };
};
export const createSklad1Action = (sklad1) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await createSklad1(sklad1, token);
    if (response.status === 200) {
      dispatch({ type: ADD_SKLAD1, token });
      return true;
    }
  };
};

export const editSklad1ction = (sklad1, id) => {
  return async (dispatch) => {
    const token = getToken();
    const response = await patchSklad1(sklad1, token, id);
    dispatch({ type: ADD_SKLAD1, token });
    return response.status === 200;
  };
};

export const deleteSklad1Action = (id) => {
  return async (dispatch) => {
    const token = getToken();
    const responce = await deleteSklad1(id, token);
    if (responce.status === 200) {
      dispatch({ type: DELETE_SKLAD1, id });
    }
    return responce.status === 200;
  };
};
// export const deleteSklad1Action = (id) => {
//   return async (dispatch) => {
//     const token = getAdminToken();
//     dispatch({ type: SET_LOADING, isLoading: true });
//     const response = await deleteNews(id, token);
//     dispatch({ type: SET_LOADING, isLoading: false });
//     if (response.status === 200) {
//       dispatch({
//         type: DELETE_NEWS,
//         id,
//       });
//     }
//     return response.status === 200;
//   };
// };

// export const editSklad1Action = (news, id, imageFormData) => {
//   return async (dispatch) => {
//     const token = getAdminToken();
//     dispatch({ type: SET_LOADING, isLoading: true });
//     const response = await patchNews(news, id, token);
//     if (response.status === 200) {
//       const imageResponse = await uploadImageToNews(
//         imageFormData,
//         response.data,
//         token
//       );
//     }
//     dispatch({ type: SET_LOADING, isLoading: false });
//     return response.status === 200;
//   };
// };
