import {
  FETCH_PHOTOS_ERROR,
  FETCH_PHOTOS_PENDING,
  FETCH_PHOTOS_SUCCESS,
  SET_PAGE,
  SET_FILTERS,
  CLEAR_PHOTOS,
} from "../constants";

export const initialState = {
  data: [],
  isLoading: false,
  error: "",
  page: 1,
  totalPages: 1,
  count: null,
  filters: {
    height: null,
    width: null,
    grayscale: false,
  },
};

export function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.meta.page,
      };
    case SET_FILTERS:
      const updatedFilters = { ...action.meta.filters };
      delete updatedFilters.page;
      const withUpdatedFilters = {
        ...state.filters,
        ...updatedFilters,
      };
      return {
        ...state,
        filters: withUpdatedFilters,
      };
    case CLEAR_PHOTOS:
      return {
        ...state,
        data: [],
        page: 1,
      };
    case FETCH_PHOTOS_PENDING:
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    case FETCH_PHOTOS_SUCCESS:
      const { page, results, count, totalPages } = action.payload;
      return {
        ...state,
        isLoading: false,
        page,
        count,
        totalPages,
        data: state.data.concat(results),
      };
    case FETCH_PHOTOS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
