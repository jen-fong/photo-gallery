const RequestError = require("./errors/RequestError");

function handleError(err, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  if (err instanceof RequestError) {
    status = err.status;
    message = err.message;
  }

  res.status(status).send({
    error: message,
  });
}

module.exports = handleError;
