const url = require("url");
const fs = require("fs").promises;
const path = require("path");

// read the photo urls from the downloaded file from pastebin
async function readDataFromFile(filename) {
  const file = await fs.readFile(
    path.join(__dirname, "../", `data/${filename}`),
    "utf8"
  );
  return file.toString().split("\r\n");
}

function filterByHeightAndWidth(photos, width, height) {
  return photos
    .map((photo) => {
      const { width: imageWidth, height: imageHeight } = photo;
      const heightMatches = height === imageHeight;
      const widthMatches = width === imageWidth;

      let dimensionsMatch = true;

      if (height && !heightMatches) {
        return false;
      }
      if (width && !widthMatches) {
        return false;
      }
      return photo;
    })
    .filter((photo) => !!photo);
}

// Breaks a photo url to its parts (id, height, width) to extract out its data
// so it is easier to consume. The object can be extended with other various data
// if necessary
function toPhotoObject(photoUrl) {
  const path = url.parse(photoUrl).pathname.split("/");
  const id = parseInt(path[2]);
  const imageHeight = path[4];
  const imageWidth = path[3];
  return {
    id,
    height: imageHeight,
    width: imageWidth,
    url: photoUrl,
  };
}

async function fetchPhotos({ grayscale, height, width, page }) {
  const photoUrls = await readDataFromFile("photoUrls.txt");
  let results = photoUrls.map(toPhotoObject);

  if (height || width) {
    results = filterByHeightAndWidth(results, width, height);
  }

  const defaultCountPerPage = 20;
  const count = results.length;
  const totalPages = Math.ceil(count / defaultCountPerPage);
  // handle paging by slicing parts of the array to imitate pagination
  const start = (page - 1) * defaultCountPerPage;
  const end = start + 20;
  results = results.slice(start, end);

  if (grayscale) {
    results = results.map((photo) => {
      return {
        ...photo,
        url: `${photo.url}?grayscale`,
      };
    });
  }

  return {
    results,
    totalPages,
    count,
    page,
  };
}

module.exports = {
  fetchPhotos,
};
