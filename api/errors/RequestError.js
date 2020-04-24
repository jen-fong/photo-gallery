class RequestError extends Error {
  constructor(message) {
    super(message);

    this.name = "RequestError";
    this.status = 400;
    this.message = message;

    Error.captureStackTrace(this, RequestError);
  }
  toString() {
    return `${this.name}: ${this.status} ${this.message}`;
  }
}

module.exports = RequestError;
