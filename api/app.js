const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const photoRoutes = require("./routes/photos");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/photos", photoRoutes);

// TODO fix error
app.use(function (err, req, res, next) {
  console.log("hit");
  // res.status(400).json({
  //   error: err,
  // });
  // if (err.response) {
  //   res.status(400).json(err.response.data);
  // }
  res.status(500).send("Internal server error");
});
module.exports = app;
