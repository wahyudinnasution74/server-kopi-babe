const express = require("express");
const router = express.Router();

const Product = require("../controllers/Products");

router
  .get("/list", Product.list)
  .get("/listBySupplierId", Product.listBySupplierId)
  .post("/createMany", Product.createMany)
  .post("/create", Product.create)
  .put("/update", Product.update)
  .delete("/delete", Product.delete);

module.exports = router;
