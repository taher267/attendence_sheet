const router = require("express").Router();
const { controllers: authControllers } = require("../api/v1/auth");

const v1 = `/api/v1`;

/*=============================================
=            Auth            =
=============================================*/

/**
 * @route baseurl/api/v1/auth/register
 * @method POST
 */
router.route(`${v1}/auth/register`).post(authControllers.register);
/**
 * @route baseurl/api/v1/auth/login-or-register-with-google
 * @method POST
 */
router
  .route(`${v1}/auth/login-or-register-with-google`)
  .post(authControllers.loginOrRegisterWithGoogle);

/**
 * @route baseurl/api/v1/auth/register-with-google
 * @method POST
 */
router
  .route(`${v1}/auth/register-with-google`)
  .post(authControllers.registerWithGoogle);

/**
 * @route baseurl/api/v1/auth/register-with-google
 * @method POST
 */
router
  .route(`${v1}/auth/loging-with-google`)
  .post(authControllers.loginWithGoogle);

/**
 * @route baseurl/api/v1/auth/login
 * @method POST
 */
router.route(`${v1}/auth/login`).post(authControllers.login);

/**
 * @route baseurl/api/v1/auth/register-with-link
 * @method POST
 */
router
  .route(`${v1}/auth/register-with-link`)
  .post(authControllers.registerWithLink);
/**
 * @route baseurl/api/v1/auth/register-link-varification
 * @method POST
 */
router
  .route(`${v1}/auth/register-link-varification`)
  .post(authControllers.registerValificationWithLink);

/**
 * @route baseurl/api/v1/auth/forget-password
 * @method POST
 */
router.route(`${v1}/auth/forget-password`).post(authControllers.forgetPassword);

/**
 * @route baseurl/api/v1/auth/reset-password
 * @method POST
 */
router.route(`${v1}/auth/reset-password`).post(authControllers.resetPassword);
/**
 * @route baseurl/api/v1/auth/refresh
 * @method POST
 */
router
  .route(`${v1}/auth/refresh`)
  .get(authControllers.getAccessTokenByRefreshToken);
/**
 * @route baseurl/api/v1/auth/logout
 * @method DELETE
 */
router.route(`${v1}/auth/logout`).delete(authControllers.logout);

/*=====  End of Auth  ======*/


module.exports = router;
