const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers } = require("../api/v1/reportPermission");

const v1 = `/api/v1`;

/*=============================================
=              report permission          =
=============================================*/
router
  .route(`${v1}/report-permissions`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-permissions
   * @method POST
   */
  .post(authenticate, authorize(), controllers.create)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-permissions
   * @method GET
   */
  .get(authenticate, authorize(), controllers.findAllItems);

router
  .route(`${v1}/report-permissions/self`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-permissions/self
   * @method GET
   */
  .get(authenticate, controllers.selfAllItems);

router
  .route(`${v1}/report-permissions/:id`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-permissions/:id
   * @method POST
   */
  .get(authenticate, controllers.findSingleItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-permissions/:id
   * @method PUT
   */
  .put(authenticate, authorize(["admin", "observer"]), controllers.updateItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-permissions/:id
   * @method DELETE
   */
  .delete(authenticate, authorize(), controllers.removeItem);

/*=====  End of report permission  ======*/

module.exports = router;
