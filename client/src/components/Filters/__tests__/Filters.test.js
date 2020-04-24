import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import * as galleryActions from "../../../actions/gallery";
import { Filters } from "../Filters";

describe("Filters", () => {
  let store, filtersState, history;
  beforeEach(() => {
    history = createMemoryHistory();
    galleryActions.setFilters = jest.fn();
    galleryActions.clearPhotos = jest.fn();

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

  const renderWithStoreAndRouter = (props) => {
    return render(
      <Provider store={store}>
        <Router history={history}>
          <Filters {...props} />
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

  it("submits form with filters when filters change", () => {
    filtersState = {
      page: 2,
      height: "100",
      width: "250",
      grayscale: true,
    };
    const prevFilters = {
      heightQuery: "400",
      widthQuery: null,
      grayscaleQuery: true,
    };
    jest.spyOn(history, "push");

    const { getByText } = renderWithStoreAndRouter(prevFilters);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalled();
    expect(galleryActions.clearPhotos).toHaveBeenCalledWith();
    expect(history.push).toHaveBeenCalledWith({
      pathname: "/",
      search: "?height=100&width=250&grayscale=true",
    });
  });

  it("does not submit form when filters haven't changed", () => {
    filtersState = {
      page: 2,
      height: "100",
      width: "250",
      grayscale: true,
    };
    const prevFilters = {
      heightQuery: filtersState.height,
      widthQuery: filtersState.width,
      grayscaleQuery: filtersState.grayscale,
    };

    const { getByText } = renderWithStoreAndRouter(prevFilters);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    expect(store.dispatch).not.toHaveBeenCalled();
    expect(galleryActions.clearPhotos).not.toHaveBeenCalledWith();
  });
});
