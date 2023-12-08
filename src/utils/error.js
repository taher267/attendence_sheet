const notFound = (msg = "Resource not found") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};

const badRequest = (msg = "Bad Request") => {
  const error = new Error(msg);
  error.status = 400;
  return error;
};

const serverError = (msg = "Internal Server Error") => {
  const error = new Error(msg);
  error.status = 500;
  return error;
};

const authenticationError = (msg = "Authentication Failed") => {
  const error = new Error(msg);
  error.status = 401;
  return error;
};

const authorizationError = (msg = "Permission Denied") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};

const customError = ({ message = "Bad request", status = 400, errors }) => {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  return error;
};
const onlyError = ({ message = "Something Went Wrong" }) => {
  const error = new Error(message);
  // error.status = status;
  // error.errors = errors;
  return error;
};

module.exports = {
  notFound,
  badRequest,
  serverError,
  authenticationError,
  authorizationError,
  customError,
  onlyError,
};
