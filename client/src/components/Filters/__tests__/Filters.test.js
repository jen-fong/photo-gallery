import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import * as galleryActions from "../../../actions/gallery";
import { Filters } from "../Filters";

describe("Filters", () => {
  let store, filtersState;
  beforeEach(() => {
    galleryActions.setFilters = jest.fn();
    galleryActions.fetchPhotos = jest.fn();

    filtersState = {
      height: null,
      width: null,
      grayscale: false,
    };
    store = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: () => ({
        gallery: {
          filters: filtersState,
        },
      }),
    };
  });

  const renderWithStoreAndRouter = () => {
    const history = createMemoryHistory();

    return render(
      <Provider store={store}>
        <Router history={history}>
          <Filters />
        </Router>
      </Provider>
    );
  };

  // react-select is not so straight forward to test but was suggested online
  // here: https://spectrum.chat/testing-library/general/approaches-to-testing-components-that-use-react-select~85e86e37-9fdb-480f-8cba-217096414719
  it("selects a height from the dropdown", () => {
    const { getByText } = renderWithStoreAndRouter();
    fireEvent.focus(document.querySelector(".select-height input"));
    fireEvent.mouseDown(document.querySelector(".select-height__control"));
    fireEvent.click(getByText("100"));

    expect(store.dispatch).toHaveBeenCalled();
    expect(galleryActions.setFilters).toHaveBeenCalledWith({ height: "100" });
  });

  it("selects a width from the dropdown", () => {
    const { getByText } = renderWithStoreAndRouter();
    fireEvent.focus(document.querySelector(".select-width input"));
    fireEvent.mouseDown(document.querySelector(".select-width__control"));
    fireEvent.click(getByText("250"));

    expect(store.dispatch).toHaveBeenCalled();
    expect(galleryActions.setFilters).toHaveBeenCalledWith({ width: "250" });
  });

  it("toggles grayscale for images", () => {
    const { getByLabelText } = renderWithStoreAndRouter();
    const grayscaleCheckbox = getByLabelText("Toggle grayscale");
    fireEvent.click(grayscaleCheckbox);

    expect(store.dispatch).toHaveBeenCalled();
    expect(galleryActions.setFilters).toHaveBeenCalledWith({ grayscale: true });
  });

  it("submits form with filters", () => {
    filtersState = {
      page: 2,
      height: "100",
      width: "250",
      grayscale: true,
    };

    const { getByText } = renderWithStoreAndRouter();
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalled();
    expect(galleryActions.fetchPhotos).toHaveBeenCalledWith({
      ...filtersState,
      page: 1,
    });
  });
});
