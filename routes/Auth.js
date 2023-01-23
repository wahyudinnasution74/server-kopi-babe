const express = require("express");
const router = express.Router();

const Auth = require("../controllers/Auth");

router
  .post("/login", Auth.login)
  .post("/loginSupplier", Auth.loginSupplier)
  .post("/signup", Auth.signup)
  .get("/list", Auth.list);

module.exports = router;
