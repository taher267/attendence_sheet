const router = require("express").Router();
const authorize = require("../middleware/authorize");
const authenticate = require("../middleware/authenticate");
const { controllers } = require("../api/v1/workReport");

const v1 = `/api/v1`;

/*=============================================
=              Work Report          =
=============================================*/

router
  .route(`${v1}/work-reports`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/work-reports
   * @method POST
   */
  .post(authenticate, controllers.create)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/work-reports
   * @method GET
   */
  .get(authenticate, authorize(["admin"]), controllers.findAllItems);
  
router
  .route(`${v1}/work-reports/self`)
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/work-reports/self
   * @method GET
   */
  .get(authenticate, controllers.selfAllItems);
router
  .route(
    `${v1}/work-reports/report-permission/:report_permission_id/report-form/:report_form_id`
  )
  /**
   * Private Route by Observer
   * @route baseurl/api/v1/work-reports/report-prmission/:report_prmission_id/report-form/:report_form_id
   * @method GET
   */
  .get(authenticate, authorize(["observer"]), controllers.observerByAllItems);
router
  .route(`${v1}/work-reports/:id`)
  /**
   * Private Route
   * @route baseurl/api/v1/work-reports/:id
   * @method POST
   */
  .get(authenticate, controllers.findSingleItem)
  /**
   * Private Route
   * @route baseurl/api/v1/work-reports/:id
   * @method PUT
   */
  .put(authenticate, controllers.updateItem)

  /**
   * Private Route
   * @route baseurl/api/v1/work-reports/:id
   * @method PATCH
   */

  .patch(
    authenticate,
    authorize(["observer"]),
    controllers.updateItemProperties
  )
  /**
   * Private Route by Admin
   * @route baseurl/api/v1/work-reports/:id
   * @method DELETE
   */
  .delete(authenticate, authorize(["admin"]), controllers.removeItem);

/*=====  End of Work Report  ======*/

module.exports = router;
