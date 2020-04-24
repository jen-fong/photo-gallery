import {
  FETCH_PHOTOS_ERROR,
  FETCH_PHOTOS_PENDING,
  FETCH_PHOTOS_SUCCESS,
  SET_PAGE,
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
