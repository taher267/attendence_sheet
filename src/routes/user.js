const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers: userControllers } = require("../api/v1/user");

const v1 = `/api/v1`;

/*=============================================
=            User            =
=============================================*/

router
  .route(`${v1}/users`)
  /**
   * Private Route with ADMIN
   * @method POST
   * @route base_url/api/v1/users
   */
  .post(authenticate, authorize(), userControllers.create)
  /**
   * Private Route With ADMIN
   * @method GET
   * @route base_url/api/v1/users
   */
  .get(authenticate, authorize(), userControllers.findAllItems);

router
  .route(`${v1}/users/mine`)
  /**
   * Private Route
   * @method GET
   * @route base_url/api/v1/users/mine
   */
  .get(authenticate, userControllers.mine);
router
  .route(`${v1}/users/:id`)
  /**
   * Private Route
   * @method GET
   * @route base_url/api/v1/users/:id
   */
  .get(authenticate, authorize(), userControllers.findSingleItem)
  /**
   * Private Route
   * @method DELETE
   * @route base_url/api/v1/users/:id
   */
  .delete(authenticate, authorize(), userControllers.removeItem)
  /**
   * Private Route with ADMIN
   * @method PUT
   * @route base_url/api/v1/users/:id
   */
  .put(authenticate, authorize(), userControllers.updateItem)
  /**
   * Private Route By admin
   * @method PATCH
   * @route base_url/api/v1/users/:id
   */
  .patch(
    authenticate,
    authorize(["super_admin", "admin"]),
    userControllers.updateItemPatch
  );

/**
 * Private Route
 * @route baseurl/api/v1/users/:id/update-profile
 * @method POST
 */
router
  .route(`${v1}/users/:id/update-profile`)
  .patch(authenticate, userControllers.profileChange);

/**
 * Private Route
 * @route baseurl/api/v1/users/:id/change-profile-pic
 * @method PATCH
 */
router
  .route(`${v1}/users/:id/change-profile-pic`)
  .patch(authenticate, userControllers.changeProfilePic);

/**
 * Private Route
 * @route baseurl/api/v1/users/set-password
 * @method POST
 */
router
  .route(`${v1}/users/set-password`)
  .post(authenticate, userControllers.setPassword);
/**
 * Private Route
 * @route baseurl/api/v1/users/update-password
 * @method POST
 */
router
  .route(`${v1}/users/update-password`)
  .post(authenticate, userControllers.updatePassword);
/*=====  End of Uer  ======*/

module.exports = router;
