const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const photoRoutes = require("./routes/photos");
const handleError = require("./handleError");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/photos", photoRoutes);

app.use(handleError);
module.exports = app;
