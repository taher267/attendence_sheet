const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("./user");
const reportFormRoutes = require("./reportForm");
const holidayRoutes = require("./holiday");
router.use(authRoutes);
router.use(userRoutes);
router.use(reportFormRoutes);
router.use(holidayRoutes);

module.exports = router;
