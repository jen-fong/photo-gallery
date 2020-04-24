import React from "react";
import "./Gallery.css";

export function PhotosRow({ photos }) {
  return (
    <div data-testid="photosRow" className="gallery-row">
      {photos.map((photo) => {
        const { url, id } = photo;
        return (
          <div key={id} className="gallery-photo">
            {/* alt would usually be a name */}
            <img src={url} alt={id} />
          </div>
        );
      })}
    </div>
  );
}
