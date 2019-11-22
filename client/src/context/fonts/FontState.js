import React, { useReducer } from "react";
import axios from "axios";
import FontContext from "./fontContext";
import fontReducer from "./fontReducer";
import {
  GET_FAVS,
  ADD_FAV,
  DELETE_FAV,
  FAV_ERROR,
  CLEAR_FAVS
} from "../auth/types";

const FontState = props => {
  const initialState = {
    favs: null,
    current: null,
    error: null
  };

  const [state, dispatch] = useReducer(fontReducer, initialState);

  // Get Favs
  const getFavs = async () => {
    try {
      const res = await axios.get("/favs");
      dispatch({
        type: GET_FAVS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FAV_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Fav
  const addFav = async fav => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/favs", fav, config);

      dispatch({
        type: ADD_FAV,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: FAV_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Fav
  const deleteFav = async id => {
    try {
      await axios.delete(`/favs/${id}`);

      dispatch({
        type: DELETE_FAV,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: FAV_ERROR,
        payload: err.response.msg
      });
    }
  };

  //   Clear Favs
  const clearFavs = () => {
    dispatch({ type: CLEAR_FAVS });
  };

  return (
    <FontContext.Provider
      value={{
        favs: state.favs,
        current: state.current,
        error: state.error,
        addFav,
        deleteFav,
        getFavs,
        clearFavs
      }}
    >
      {props.children}
    </FontContext.Provider>
  );
};

export default FontState;
