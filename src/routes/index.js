const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const reportFormRoutes = require("./reportForm");
const establishmentRoutes = require("./establishment");
const departmentFormRoutes = require("./department");
const holidayRoutes = require("./holiday");
const reportPermissionRoutes = require("./reportPermission");
const workReportRoutes = require("./workReport");
router.use(authRoutes);
router.use(userRoutes);
router.use(reportFormRoutes);
router.use(establishmentRoutes);
router.use(departmentFormRoutes);
router.use(holidayRoutes);
router.use(reportPermissionRoutes);
router.use(workReportRoutes);

module.exports = router;
