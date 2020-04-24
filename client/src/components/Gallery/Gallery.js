import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import Spinner from "react-svg-spinner";
import { fetchPhotos, setPage } from "../../actions/gallery";
import {
  getError,
  getTotalPages,
  getIsLoading,
  getPage,
  getPhotos,
} from "../../selectors/gallery";
import { Filters } from "../Filters";
import { PhotosRow } from "./PhotosRow";
import "./Gallery.css";

export function Gallery() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const photos = useSelector(getPhotos);
  const page = useSelector(getPage);
  const totalPages = useSelector(getTotalPages);
  const hasMore = page < totalPages;

  const photosPerRow = 3;
  const photoRows = Math.ceil(photos.length / photosPerRow);
  const rows = Array.from(Array(photoRows).keys());

  const setNextPage = () => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
  };

  const location = useLocation();
  const currentRouteQueries = qs.parse(location.search, {
    ignoreQueryPrefix: true, // search contains a leading ? in the query
  });
  const grayscaleValInQuery = currentRouteQueries.grayscale;
  const heightValInQuery = currentRouteQueries.height || null;
  const widthValInQuery = currentRouteQueries.width || null;
  const grayscaleValToBool =
    grayscaleValInQuery === "true" || grayscaleValInQuery === "";

  useEffect(() => {
    dispatch(
      fetchPhotos({
        page,
        grayscale: grayscaleValToBool,
        height: heightValInQuery,
        width: widthValInQuery,
      })
    );
  }, [dispatch, page, grayscaleValToBool, heightValInQuery, widthValInQuery]);

  // only display on page 1 since we do not want to wipe out previous
  // images when fetching for infinite scroll
  if (isLoading && page === 1) {
    return <Spinner />;
  }

  // this should be a separate reuseable component but it will work for
  // this app for now
  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="gallery-container">
      <Filters
        heightQuery={heightValInQuery}
        widthQuery={widthValInQuery}
        grayscaleQuery={grayscaleValToBool}
      />
      {!photos.length && <section>No results found</section>}
      <section>
        <InfiniteScroll
          className="gallery-section"
          dataLength={photos.length}
          next={setNextPage}
          hasMore={hasMore}
          loader={"Loading..."}
        >
          {rows.map((row) => {
            const start = row * photosPerRow;
            const photosForRow = photos.slice(start, start + photosPerRow);

            return <PhotosRow key={row} photos={photosForRow} />;
          })}
        </InfiniteScroll>
      </section>
    </div>
  );
}
