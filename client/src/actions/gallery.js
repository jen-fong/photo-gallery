import axios from "axios";
import { defaultFetchParams, baseURL } from "../api/gallery";
import {
  FETCH_PHOTOS_ERROR,
  FETCH_PHOTOS_PENDING,
  FETCH_PHOTOS_SUCCESS,
  SET_PAGE,
} from "../constants";

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    meta: { page },
  };
};

export const fetchPhotos = (photoParams) => async (dispatch) => {
  const params = { ...defaultFetchParams, ...photoParams };
  const url = `${baseURL}/photos`;

  dispatch({
    type: FETCH_PHOTOS_PENDING,
  });

  try {
    const moviesResponse = await axios.get(url, { params });

    dispatch({
      type: FETCH_PHOTOS_SUCCESS,
      payload: moviesResponse.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PHOTOS_ERROR,
      payload: err.response.data,
    });
  }
};
