const userConfig = require("../config/user");
const { authorizationError } = require("../utils/error");

const authorize =
  (roles = userConfig.authorize_roles) =>
  (req, _res, next) => {
    console.log("User", req.user,);
    let isAuthorized = false;
    for (const role of roles) {
      if (req.user?.roles?.includes?.(role)) {
        isAuthorized = true;
      }
    }
    if (isAuthorized) {
      return next();
    }

    return next(authorizationError());
  };

module.exports = authorize;
