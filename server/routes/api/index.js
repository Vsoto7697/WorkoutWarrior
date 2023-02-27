const router = require("express").Router();
const userRoutes = require("./user-routes");
const sneakerRoutes = require("./sneaker-routes");

router.use("/user", userRoutes);
router.use("/exercise", sneakerRoutes);

module.exports = router;