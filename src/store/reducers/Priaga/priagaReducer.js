import {
  SET_PRIAGA,
  SET_FILTERED_PRIAGA,
  SET_SINGLE_PRIAGA,
  ADD_PRIAGA,
  DELETE_PRIAGA,
  DELETE_PRIAGA_ROZHID,
  ADD_PRIAGA_ROZHID,
} from "../../actions/actionTypes";

const initialState = {
  priaja: "",
  filtered: [],
  single: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRIAGA:
      return {
        ...state,
        priaja: action.priaja,
      };
    case SET_SINGLE_PRIAGA:
      return { ...state, single: action.singlePraja };
    case ADD_PRIAGA:
      return {
        ...state,
        priaja: [...state.priaja, action.priaja],
      };
    case ADD_PRIAGA_ROZHID:
      return {
        ...state,
        priajaRozhid: [...state.priajaRozhid, action.priajaRozhid],
      };
    case SET_FILTERED_PRIAGA:
      return {
        ...state,
        filtered: action.filtered,
      };
    case DELETE_PRIAGA:
      return {
        ...state,
        priaja: state.priaja.filter((material) => material._id !== action.id),
      };
    case DELETE_PRIAGA_ROZHID:
      return {
        ...state,
        priajaRozhid: state.priajaRozhid.filter(
          (material) => material._id !== action.id
        ),
      };
    default:
      return state;
  }
};
