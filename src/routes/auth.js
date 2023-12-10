const router = require("express").Router();
const { controllers } = require("../api/v1/auth");

const v1 = `/api/v1`;

/*=============================================
=            Auth            =
=============================================*/

/**
 * @route baseurl/api/v1/auth/register
 * @method POST
 */
router.route(`${v1}/auth/register`).post(controllers.register);
/**
 * @route baseurl/api/v1/auth/login-or-register-with-google
 * @method POST
 */
router
  .route(`${v1}/auth/login-or-register-with-google`)
  .post(controllers.loginOrRegisterWithGoogle);

/**
 * @route baseurl/api/v1/auth/register-with-google
 * @method POST
 */
router
  .route(`${v1}/auth/register-with-google`)
  .post(controllers.registerWithGoogle);

/**
 * @route baseurl/api/v1/auth/register-with-google
 * @method POST
 */
router.route(`${v1}/auth/loging-with-google`).post(controllers.loginWithGoogle);

/**
 * @route baseurl/api/v1/auth/login
 * @method POST
 */
router.route(`${v1}/auth/login`).post(controllers.login);

/**
 * @route baseurl/api/v1/auth/register-with-link
 * @method POST
 */
router
  .route(`${v1}/auth/register-with-link`)
  .post(controllers.registerWithLink);
/**
 * @route baseurl/api/v1/auth/register-link-varification
 * @method POST
 */
router
  .route(`${v1}/auth/register-link-varification`)
  .post(controllers.registerValificationWithLink);

/**
 * @route baseurl/api/v1/auth/forget-password
 * @method POST
 */
router.route(`${v1}/auth/forget-password`).post(controllers.forgetPassword);

/**
 * @route baseurl/api/v1/auth/reset-password
 * @method POST
 */
router.route(`${v1}/auth/reset-password`).post(controllers.resetPassword);
/**
 * @route baseurl/api/v1/auth/refresh
 * @method POST
 */
router
  .route(`${v1}/auth/refresh`)
  .get(controllers.getAccessTokenByRefreshToken);
/**
 * @route baseurl/api/v1/auth/logout
 * @method DELETE
 */
router.route(`${v1}/auth/logout`).delete(controllers.logout);

/*=====  End of Auth  ======*/

module.exports = router;
