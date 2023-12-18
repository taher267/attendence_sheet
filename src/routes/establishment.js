const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers } = require("../api/v1/establishment");

const v1 = `/api/v1`;

/*=============================================
=              establishment          =
=============================================*/
router
  .route(`${v1}/establishments`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/establishments
   * @method POST
   */
  .post(authenticate, authorize(["admin", "observer"]), controllers.create)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/establishments
   * @method GET
   */
  .get(authenticate, authorize(["admin"]), controllers.findAllItems);

router
  .route(`${v1}/establishments/:id`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/establishments/:id
   * @method POST
   */
  .get(authenticate, authorize(), controllers.findSingleItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/establishments/:id
   * @method PUT
   */
  .put(authenticate, authorize(), controllers.updateItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/establishments/:id
   * @method DELETE
   */
  .delete(authenticate, authorize(), controllers.removeItem);

/*=====  End of establishment  ======*/

module.exports = router;
