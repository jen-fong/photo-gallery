const express = require("express");
const asyncHandler = require("../asyncHandler");
const photoService = require("../service/photos");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { grayscale, page, height = null, width = null } = req.query;
    const pageToInt = parseInt(page);
    let isGrayscale = grayscale === "" || grayscale === "true";

    const searchParams = {
      grayscale: isGrayscale,
      page: pageToInt || 1,
      height,
      width,
    };

    return await photoService.fetchPhotos(searchParams);
  })
);

module.exports = router;
