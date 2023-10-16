var express = require("express");
var router = express.Router();
var registeringController = require("../controllers/registering/service");
router.post("/login", registeringController.login);
router.post("/logout", registeringController.logout);
module.exports = router;
