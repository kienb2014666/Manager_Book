const express = require("express");
const router = express.Router();
const pubController = require("../controllers/PublisherController");


router.post("/create", pubController.createPub);
router.put("/update/:id", pubController.updatePub);
router.delete("/delete-pub/:id", pubController.deletePub);
router.get("/getAll", pubController.getAllPub);
router.get("/get-details/:id", pubController.getDetailsPub);



module.exports = router;
