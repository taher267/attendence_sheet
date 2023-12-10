const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const reportFormRoutes = require("./reportForm");
const holidayRoutes = require("./holiday");
const reportPermissionRoutes = require("./reportPermission");
router.use(authRoutes);
router.use(userRoutes);
router.use(reportFormRoutes);
router.use(holidayRoutes);
router.use(reportPermissionRoutes);

module.exports = router;
