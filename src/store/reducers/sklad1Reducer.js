import {
    ADD_SKLAD1,
    DELETE_SKLAD1,
    SET_FILTERED_SKLAD1,
    SET_SKLAD1,
    SET_SKLAD1_TO2,
    SET_SKLAD1_ZALUSHOK,
} from "../actions/actionTypes";

const initialState = {
    sklad1: "",
    filtered: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SKLAD1:
            return {
                ...state,
                sklad1: action.sklad1,
            };
        case SET_SKLAD1_TO2:
            return {
                ...state,
                sklad1to2: action.sklad1to2,
            };
        case SET_FILTERED_SKLAD1:
            return {
                ...state,
                filtered: action.filtered,
            };
        case ADD_SKLAD1:
            return {
                ...state,
                sklad1: [...state.sklad1, action.sklad1],
            };
        case DELETE_SKLAD1:
            return {
                ...state,
                sklad1: state.sklad1.filter((sklad1) => sklad1._id !== action._id),
            };
        case SET_SKLAD1_ZALUSHOK:
            return {
                ...state,
                sklad1_zalushok: action.sklad1_zalushok
            };
        default:
            return state;
    }
};
