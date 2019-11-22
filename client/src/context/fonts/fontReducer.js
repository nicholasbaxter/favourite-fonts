import {
  GET_FAVS,
  ADD_FAV,
  DELETE_FAV,
  FAV_ERROR,
  CLEAR_FAVS
} from "../auth/types";

export default (state, action) => {
  switch (action.type) {
    case GET_FAVS:
      return {
        ...state,
        favs: action.payload,
        loading: false
      };
    case ADD_FAV:
      return {
        ...state,
        favs: [action.payload, ...state.favs],
        loading: false
      };

    case DELETE_FAV:
      return {
        ...state,
        favs: state.favs.filter(fav => fav._id !== action.payload),
        loading: false
      };
    case CLEAR_FAVS:
      return {
        ...state,
        favs: null,
        filtered: null,
        error: null,
        current: null
      };

    case FAV_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
