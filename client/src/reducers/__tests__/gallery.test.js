import {
  FETCH_PHOTOS_ERROR,
  FETCH_PHOTOS_SUCCESS,
  FETCH_PHOTOS_PENDING,
  SET_PAGE,
  SET_FILTERS,
  CLEAR_PHOTOS,
} from "../../constants";
import { galleryReducer, initialState } from "../gallery";

describe("gallery reducers", () => {
  it(`${FETCH_PHOTOS_SUCCESS} returns new data from api`, () => {
    const newData = {
      count: 2,
      totalPages: 1,
      page: 1,
      results: [
        {
          id: 1,
          height: "100",
          width: "200",
          url: "picture.com/1/200/100",
        },
        {
          id: 2,
          height: "100",
          width: "100",
          url: "picture.com/2/100/100",
        },
      ],
    };

    const newState = galleryReducer(initialState, {
      type: FETCH_PHOTOS_SUCCESS,
      payload: newData,
    });

    expect(newState).toEqual({
      filters: {
        grayscale: false,
        height: null,
        width: null,
      },
      data: newData.results,
      page: newData.page,
      count: newData.count,
      totalPages: newData.totalPages,
      isLoading: false,
      error: "",
    });
  });

  it(`${FETCH_PHOTOS_PENDING} sets loading to true`, () => {
    const newState = galleryReducer(initialState, {
      type: FETCH_PHOTOS_PENDING,
    });

    expect(newState).toEqual({
      ...initialState,
      isLoading: true,
      error: "",
    });
  });

  it(`${FETCH_PHOTOS_ERROR} sets error to true`, () => {
    const error = "An error occurred";

    const newState = galleryReducer(initialState, {
      type: FETCH_PHOTOS_ERROR,
      payload: {
        error,
      },
    });

    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      error,
    });
  });

  it(`${SET_FILTERS} sets search filters`, () => {
    const filters = {
      grayscale: true,
      height: "100",
      width: "200",
    };

    const newState = galleryReducer(initialState, {
      type: SET_FILTERS,
      meta: {
        filters,
      },
    });

    expect(newState).toEqual({
      ...initialState,
      filters,
    });
  });

  it(`${CLEAR_PHOTOS} clears photo data`, () => {
    const stateWithData = {
      ...initialState,
      data: [
        {
          id: 1,
          height: "100",
          width: "200",
          url: "picture.com/1/200/100",
        },
      ],
    };

    const newState = galleryReducer(stateWithData, {
      type: CLEAR_PHOTOS,
    });

    expect(newState).toEqual({
      ...initialState,
      data: [],
    });
  });

  it(`${SET_PAGE} sets current page`, () => {
    const page = 3;

    const newState = galleryReducer(initialState, {
      type: SET_PAGE,
      meta: {
        page,
      },
    });

    expect(newState).toEqual({
      ...initialState,
      page,
    });
  });
});
