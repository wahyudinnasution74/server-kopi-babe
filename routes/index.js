const express = require("express");
const router = express.Router();

router
  .use("/auth", require("./Auth"))
  .use("/product", require("./Product"))
  .use("/supplier", require("./Supplier"));

module.exports = router;
