import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import * as galleryActions from "../../../actions/gallery";
import { Gallery } from "../Gallery";

describe("Gallery", () => {
  let store, state, photos, history;
  beforeEach(() => {
    history = createMemoryHistory();
    galleryActions.fetchPhotos = jest.fn();

    photos = [
      {
        id: 1,
        height: "100",
        width: "100",
        url: "picture.com/1/100/100",
      },
      {
        id: 2,
        height: "200",
        width: "100",
        url: "picture.com/2/100/200",
      },
      {
        id: 3,
        height: "300",
        width: "200",
        url: "picture.com/3/200/300",
      },
      {
        id: 4,
        height: "400",
        width: "400",
        url: "picture.com/4/400/400",
      },
    ];

    state = {
      gallery: {
        filters: {
          grayscale: false,
          height: null,
          width: null,
        },
        page: 1,
        data: photos,
        totalPages: 1,
        count: 4,
        isLoading: false,
        error: "",
      },
    };
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: () => state,
    };
  });

  const renderWithStoreAndRouter = (Component) => {
    return render(
      <Provider store={store}>
        <Router history={history}>
          <Gallery />
        </Router>
      </Provider>
    );
  };

  it("displays rows of photos", () => {
    const { getAllByTestId } = renderWithStoreAndRouter();

    expect(getAllByTestId("photosRow")).toHaveLength(2);
  });

  it("fetches photos with router query params", () => {
    history.push({
      pathname: "/",
      search: "?page=2&grayscale=true&width=100",
    });

    renderWithStoreAndRouter();

    expect(galleryActions.fetchPhotos).toHaveBeenCalledWith({
      grayscale: true,
      height: null,
      page: 1,
      width: "100",
    });
  });

  it("displays a spinner when loading and page 1", () => {
    state.gallery.isLoading = true;

    const { getByTitle } = renderWithStoreAndRouter();

    expect(getByTitle("Circle loading spinner")).toBeInTheDocument();
  });

  it("displays an error when error", () => {
    state.gallery.error = "an error occurred";

    const { getByText } = renderWithStoreAndRouter();

    expect(getByText("an error occurred")).toBeInTheDocument();
  });
});
