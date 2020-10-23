import {
  ADD_PRAJA_SUROVUNA,
  DELETE_PRAJA_SUROVUNA,
  SET_FILTER_PRAJA_SUROVUNA,
  SET_PRAJA_SUROVUNA,
} from "../../actions/actionTypes";

const initialState = {
  prajaSurovuna: "",
  filtered: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRAJA_SUROVUNA:
      return {
        ...state,
        prajaSurovuna: action.prajaSurovuna,
      };
    case SET_FILTER_PRAJA_SUROVUNA:
      return {
        ...state,
        filtered: action.filtered,
      };
    case ADD_PRAJA_SUROVUNA:
      return {
        ...state,
        prajaSurovuna: [...state.prajaSurovuna, action.prajaSurovuna],
      };
    case DELETE_PRAJA_SUROVUNA:
      return {
        ...state,
        prajaSurovuna: state.prajaSurovuna.filter(
          (prajaSurovuna) => prajaSurovuna._id !== action._id
        ),
      };
    default:
      return state;
  }
};
