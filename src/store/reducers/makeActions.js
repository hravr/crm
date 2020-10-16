import axios from "axios";
import { API_ENDPOINT, apiCall } from "../../api/constant";
import { requestData, requestFailed } from "./";

export function getItemList(actionType) {
  return (dispatch) => {
    dispatch(requestData(actionType));

    axios
      .get(`${API_ENDPOINT}${apiCall(actionType).endPoints.get}`, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        return response.data;
      })
      .then((res) => {
        if (res.success) {
          dispatch(receiveItems(actionType, res.payload));
        } else {
          dispatch(requestFailed(actionType));
        }
      });
  };
}

function receiveItems(actionType, items) {
  return {
    type: `RECEIVE_${actionType}`,
    payload: items,
    receivedAt: Date.now(),
  };
}
