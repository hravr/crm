import { SET_PRAJA_TOVTSHINA } from "../../actions/actionTypes";

const initialState = {
  prajaTovtshina: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_TOVTSHINA:
      return {
        ...state,
        prajaTovtshina: action.prajaTovtshina,
      };
    default:
      return state;
  }
};
