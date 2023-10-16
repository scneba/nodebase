var express = require("express");
var router = express.Router();
var listingController = require("../controllers/listing/service");
var registeringController = require("../controllers/registering/service");
var deleteController = require("../controllers/deleting/service");
var updateController = require("../controllers/updating/service");

router.get("/", listingController.getUsers);
router.get("/users", listingController.getUsers);
router.post("/users", registeringController.addUser);
router.patch("/users", updateController.updateUser);
router.delete("/users", deleteController.deleteUser);
router.get("/roles", listingController.getRoles);
router.post("/roles", registeringController.addRole);
router.delete("/roles", deleteController.deleteRole);
router.patch("/roles", updateController.updateRole);
router.get("/permissions", listingController.getPermissions);
router.post("/permissions", registeringController.addPermission);
router.delete("/permissions", deleteController.deletePermission);

router.put("/roles", registeringController.putRole);
router.put("/users", registeringController.putUser);

// router.get("/categories/first", baseController.getFirstCategory);
// router.post("/status", baseController.addStatus);
// router.post("/categories", baseController.addCategory);
// router.post("/feedback", baseController.addFeedBack);
// router.post("/questions", baseController.addQuestion);

module.exports = router;
