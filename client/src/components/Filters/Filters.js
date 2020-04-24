import React from "react";
import Select from "react-select";
import qs from "qs";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilters, clearPhotos, fetchPhotos } from "../../actions/gallery";
import "./Filters.css";

function getOptions(options) {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
}

const heights = ["100", "200", "250", "300"];
const widths = ["100", "250", "300", "400"];
const heightOptions = getOptions(heights);
const widthOptions = getOptions(widths);

function createValueOption(value) {
  return value ? { value, label: value } : "";
}

export function Filters() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const height = useSelector((state) => state.gallery.filters.height);
  const width = useSelector((state) => state.gallery.filters.width);
  const isGrayscale = useSelector((state) => state.gallery.filters.grayscale);

  const selectedHeightOption = createValueOption(height);
  const selectedWidthOption = createValueOption(width);

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryForFetch = {
      height,
      width,
      grayscale: isGrayscale,
    };
    // remove all nullsy values from the query string
    const withoutUnspecifiedFilters = Object.keys(queryForFetch).reduce(
      (accum, curr) => {
        if (queryForFetch[curr] !== null) {
          accum[curr] = queryForFetch[curr];
        }
        return accum;
      },
      {}
    );

    const newQueryString = qs.stringify(withoutUnspecifiedFilters);

    // clear photos separately to handle the infinite scroll needing to append
    // to the photos array
    dispatch(clearPhotos());
    dispatch(
      fetchPhotos({
        page: 1,
        grayscale: isGrayscale,
        height,
        width,
      })
    );
    history.push({
      pathname: location.pathname,
      search: "?" + newQueryString,
    });
  };

  const handleSelect = (selectedOption, action) => {
    const value = selectedOption ? selectedOption.value : null;
    dispatch(setFilters({ [action.name]: value }));
  };

  const handleCheck = (event) => {
    dispatch(setFilters({ [event.target.name]: event.target.checked }));
  };

  return (
    <form onSubmit={handleSubmit} className="gallery-filters-form">
      <div className="filter-item">
        <div className="select-label">Height (px)</div>
        <Select
          onChange={handleSelect}
          name="height"
          placeholder="Select height..."
          value={selectedHeightOption}
          options={heightOptions}
          className="select-height"
          classNamePrefix="select-height"
          isClearable
        />
      </div>

      <div className="filter-item">
        <div className="select-label">Width (px)</div>
        <Select
          onChange={handleSelect}
          name="width"
          placeholder="Select width..."
          value={selectedWidthOption}
          defaultValue={selectedWidthOption}
          options={widthOptions}
          className="select-width"
          classNamePrefix="select-width"
          isClearable
        />
      </div>

      <div className="filter-checkbox">
        <input
          type="checkbox"
          name="grayscale"
          id="grayscale"
          checked={isGrayscale}
          onChange={handleCheck}
        />
        <label htmlFor="grayscale">Toggle grayscale</label>
      </div>

      <section className="save">
        <button className="btn-primary" type="submit">
          Submit
        </button>
      </section>
    </form>
  );
}
