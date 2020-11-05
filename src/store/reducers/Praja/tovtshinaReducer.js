import {
  ADD_PRAJA_TOVTSHINA,
  DELETE_PRAJA_TOVTSHINA,
  SET_FILTER_PRAJA_TOVTSHINA,
  SET_PRAJA_TOVTSHINA,
} from "../../actions/actionTypes";

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
    case SET_FILTER_PRAJA_TOVTSHINA:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PRAJA_TOVTSHINA:
      return {
        ...state,
        prajaTovtshina: [...state.prajaTovtshina, action.prajaTovtshina],
      };
    case DELETE_PRAJA_TOVTSHINA:
      return {
        ...state,
        prajaTovtshina: state.prajaTovtshina.filter(
          (prajaTovtshina) => prajaTovtshina._id !== action.id
        ),
      };
    default:
      return state;
  }
};
