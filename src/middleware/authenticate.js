const tokenService = require("../service/token");
const userRepo = require("../repo/user");
const { USER_CACHE_DATA_EXPIRY } = process.env;
const { authenticationError, serverError } = require("../utils/error");
const cache = require("../cache");
const config = require("../config/user");

const authenticate = async (req, _res, next) => {
  console.log("authenticate check============");
  if (!USER_CACHE_DATA_EXPIRY) {
    throw serverError();
  }
  try {
    const token = req.headers?.authorization?.split?.(" ")?.[1];
    console.log("authenticate check");
    if (!token) {
      return next(authenticationError());
    }
    const decoded = tokenService.verifyToken({ token });
    const cacheKey = `${config.authUserCachePrefixWithAuth}${decoded.id}`;
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
// setTimeout(() => {
//   fetch(
//     `http://localhost:4003/api/v1/report-permissions/self?page=1&limit=10&expands=observer%2Creport_form%2Choliday`,
//     {
//       method: "GET",
//       credentials: "include", // include, *same-origin, omit
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2I2ZDFjMTJlOWM5ZDkxMjExZDRiMCIsImVtYWlsIjoidGFoZXJ0d2VldHN5QGdtYWlsLmNvbSIsImlhdCI6MTcwNzU4NDg2MywiZXhwIjoxNzA3NTg4NDYzfQ.cw5Pyh9UUwd-6w87aZ7t4c3J_pm1yMtBtI_FkSkUhS0`,
//       },
//     }
//   )
//     .then((d) => {
//       if (d.status < 400) {
//         return d.json();
//       }
//       console.log(d);
//       return d;
//     })
//     .then(console.log)
//     .catch(console.error);
// }, 8000);
