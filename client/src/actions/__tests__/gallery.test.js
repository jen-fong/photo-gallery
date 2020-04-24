import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import {
  FETCH_PHOTOS_ERROR,
  FETCH_PHOTOS_PENDING,
  FETCH_PHOTOS_SUCCESS,
  SET_FILTERS,
  SET_PAGE,
  CLEAR_PHOTOS,
} from "../../constants";
import * as galleryActions from "../gallery";

const mockStore = configureMockStore([thunk]);

describe("gallery actions", () => {
  let store;
  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({});
    axios.get = jest.fn();
  });

  describe("fetchPhotos", () => {
    it("fetches photos with params", async () => {
      const filters = {
        page: 1,
        height: "100",
        width: null,
        grayscale: true,
      };
      const mockReturnData = {
        data: {
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
          totalPages: 1,
          page: 1,
          count: 2,
        },
      };
      axios.get.mockImplementation(() => Promise.resolve(mockReturnData));

      await store.dispatch(galleryActions.fetchPhotos(filters));

      expect(store.getActions()).toEqual([
        { type: SET_FILTERS, meta: { filters } },
        {
          type: FETCH_PHOTOS_PENDING,
        },
        {
          type: FETCH_PHOTOS_SUCCESS,
          payload: mockReturnData.data,
        },
      ]);
    });

    it("dispatches an error when fetching fails", async () => {
      const filters = { page: 1 };
      const errorResponse = {
        error: "an error occurred",
      };
      axios.get.mockImplementation(() =>
        Promise.reject({
          response: {
            data: errorResponse,
          },
        })
      );

      await store.dispatch(galleryActions.fetchPhotos(filters));

      expect(store.getActions()).toEqual([
        { type: SET_FILTERS, meta: { filters } },
        {
          type: FETCH_PHOTOS_PENDING,
        },
        {
          type: FETCH_PHOTOS_ERROR,
          payload: errorResponse,
        },
      ]);
    });
  });

  describe("setPage", () => {
    it("dispatches action to set page", () => {
      const nextPage = 2;

      store.dispatch(galleryActions.setPage(nextPage));

      expect(store.getActions()).toEqual([
        { type: SET_PAGE, meta: { page: nextPage } },
      ]);
    });
  });

  describe("setFilter", () => {
    it("dispatches action to set the filter for the gallery", () => {
      const filter = {
        grayscale: true,
      };

      store.dispatch(galleryActions.setFilters(filter));

      expect(store.getActions()).toEqual([
        { type: SET_FILTERS, meta: { filters: filter } },
      ]);
    });
  });

  describe("clearPhotos", () => {
    it("dispatches action to clear the photos", () => {
      store.dispatch(galleryActions.clearPhotos());

      expect(store.getActions()).toEqual([{ type: CLEAR_PHOTOS }]);
    });
  });
});
