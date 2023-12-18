const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers } = require("../api/v1/department");

const v1 = `/api/v1`;

/*=============================================
=              Department          =
=============================================*/
router
  .route(`${v1}/departments`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/departments
   * @method POST
   */
  .post(authenticate, authorize(["admin", "observer"]), controllers.create)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/departments
   * @method GET
   */
  .get(authenticate, authorize(["admin"]), controllers.findAllItems);

router
  .route(`${v1}/departments/:id`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/departments/:id
   * @method POST
   */
  .get(authenticate, authorize(), controllers.findSingleItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/departments/:id
   * @method PUT
   */
  .put(authenticate, authorize(), controllers.updateItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/departments/:id
   * @method DELETE
   */
  .delete(authenticate, authorize(), controllers.removeItem);

/*=====  End of Department  ======*/

module.exports = router;
