const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers: reportFormControllers } = require("../api/v1/reportForm");

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
  .post(authenticate, authorize(), reportFormControllers.create)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms
   * @method GET
   */
  .get(authenticate, authorize(), reportFormControllers.findAllItems);

router
  .route(`${v1}/report-forms/:id`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms/:id
   * @method POST
   */
  .get(authenticate, authorize(), reportFormControllers.findSingleItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms/:id
   * @method PUT
   */
  .put(authenticate, authorize(), reportFormControllers.updateItem)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/report-forms/:id
   * @method DELETE
   */
  .delete(authenticate, authorize(), reportFormControllers.removeItem);

/*=====  End of ReportForm  ======*/

module.exports = router;
