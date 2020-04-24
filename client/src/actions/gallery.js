import axios from "axios";
import { defaultFetchParams, baseURL } from "../api/gallery";
import {
  FETCH_PHOTOS_ERROR,
  FETCH_PHOTOS_PENDING,
  FETCH_PHOTOS_SUCCESS,
  SET_PAGE,
  SET_FILTERS,
  CLEAR_PHOTOS,
} from "../constants";

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    meta: { page },
  };
};

export const setFilters = (filters) => {
  return {
    type: SET_FILTERS,
    meta: { filters },
  };
};

export const clearPhotos = () => {
  return {
    type: CLEAR_PHOTOS,
  };
};

export const fetchPhotos = (photoParams) => async (dispatch) => {
  const params = { ...defaultFetchParams, ...photoParams };
  const url = `${baseURL}/photos`;

  dispatch(setFilters(photoParams));

  dispatch({
    type: FETCH_PHOTOS_PENDING,
  });

  try {
    const photosResponse = await axios.get(url, { params });

    dispatch({
      type: FETCH_PHOTOS_SUCCESS,
      payload: photosResponse.data,
    });
  } catch (err) {
    dispatch({
      type: FETCH_PHOTOS_ERROR,
      payload: err.response.data,
    });
  }
};
