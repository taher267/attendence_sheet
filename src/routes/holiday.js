const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers } = require("../api/v1/holiday");

const v1 = `/api/v1`;

/*=============================================
=              holiday          =
=============================================*/
router
  .route(`${v1}/holidays`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/holidays
   * @method POST
   */
  .post(authenticate, authorize(), controllers.create)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/holidays
   * @method GET
   */
  .get(authenticate, authorize(), controllers.findAllItems);

router
  .route(`${v1}/holidays/:id`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/holidays/:id
   * @method POST
   */
  .get(authenticate, authorize(), controllers.findSingleItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/holidays/:id
   * @method PUT
   */
  .put(authenticate, authorize(), controllers.updateItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/holidays/:id
   * @method DELETE
   */
  .delete(authenticate, authorize(), controllers.removeItem);

/*=====  End of holiday  ======*/

module.exports = router;
