import React from "react";
import { render } from "@testing-library/react";
import { PhotosRow } from "../PhotosRow";

describe("PhotosRow", () => {
  it("renders a row of 3 photos", () => {
    const rowOfPhotos = [
      {
        id: 1,
        height: "200",
        width: "200",
        url: "picture.com/1/200/200",
      },
      {
        id: 2,
        height: "100",
        width: "100",
        url: "picture.com/2/100/100",
      },
      {
        id: 3,
        height: "200",
        width: "400",
        url: "picture.com/3/400/200",
      },
    ];

    const { getByAltText } = render(<PhotosRow photos={rowOfPhotos} />);

    rowOfPhotos.forEach(({ id }) => {
      const idToString = String(id);
      expect(getByAltText(idToString)).toBeInTheDocument();
    });
  });
});
