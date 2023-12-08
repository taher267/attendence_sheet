const tokenService = require("../service/token");
const userRepo = require("../repo/user");
const { USER_CACHE_DATA_EXPIRY } = process.env;
const { authenticationError, serverError } = require("../utils/error");
const cache = require("../cache");

const authenticate = async (req, _res, next) => {
  if (!USER_CACHE_DATA_EXPIRY) {
    throw serverError();
  }
  try {
    const token = req.headers?.authorization?.split?.(" ")?.[1];
    if (!token) {
      return next(authenticationError());
    }
    const decoded = tokenService.verifyToken({ token });
    const cacheKey = `authUser:${decoded.id}`;
    const doesExistCache = cache.get(cacheKey);
    if (doesExistCache) {
      if (doesExistCache?.status) {
        if (doesExistCache.status === "pending") {
          return next(authenticationError(`Please verify your account!`));
        } else if (doesExistCache.status === "inactive") {
          return next(authenticationError)(
            `Your are not eligible to login, please contact with support!`
          );
        }
      }

      req.user = doesExistCache;
      return next();
    }
    const user = await userRepo.findItemById({ id: decoded.id });

    if (!user) {
      return next(authenticationError());
    }

    if (user?.status) {
      if (user.status === "pending") {
        return next(authenticationError(`Please verify your account!`));
      } else if (user.status === "inactive") {
        return next(authenticationError)(
          `Your are not eligible to login, please contact with support!`
        );
      }
    }
    cache.set(cacheKey, user, Number(USER_CACHE_DATA_EXPIRY));

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authenticate;
