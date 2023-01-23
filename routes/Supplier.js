const express = require("express");
const router = express.Router();

const Supplier = require("../controllers/Supplier");

router
  .get("/list", Supplier.list)
  .post("/createMany", Supplier.createMany)
  .post("/create", Supplier.create)
  .put("/update", Supplier.update)
  .delete("/delete", Supplier.delete);

module.exports = router;
