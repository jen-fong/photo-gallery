// wrapper to handle async functions so you do not have to call try/catch in
// every route. Always returns a promise
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve()
    .then(() => fn(req, res, next))
    .then((data) => res.json(data))
    .catch(next);
};

module.exports = asyncHandler;
