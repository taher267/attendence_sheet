const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers } = require("../api/v1/reportForm");

const v1 = `/api/v1`;

/*=============================================
=              ReportForm          =
=============================================*/
router
  .route(`${v1}/report-forms`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms
   * @method POST
   */
  .post(authenticate, authorize(["admin", "observer"]), controllers.create)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms
   * @method GET
   */
  .get(authenticate, authorize(["admin"]), controllers.findAllItems);

router
  .route(`${v1}/report-forms/:id`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms/:id
   * @method POST
   */
  .get(authenticate, authorize(), controllers.findSingleItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms/:id
   * @method PUT
   */
  .put(authenticate, authorize(), controllers.updateItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms/:id
   * @method DELETE
   */
  .delete(authenticate, authorize(), controllers.removeItem);

/*=====  End of ReportForm  ======*/

module.exports = router;
