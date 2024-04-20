const express = require("express");
const router = express.Router();
const publisherController = require("../controllers/PublisherController");

router.post("/",publisherController.createPublisher);
router.put("/update/:id", publisherController.updatePublisher);
router.delete("/delete-product/:id", publisherController.deletePublisher);
router.get("/getAll", publisherController.getAllPublisher);


module.exports = router;