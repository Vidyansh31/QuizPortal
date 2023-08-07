const express = require("express");
const router = express.Router();
const myController = require("../Controller/myController");


router.post("/builder/CategorizeSubmit", myController.categorizeSubmit)
router.post("/builder/ClozeSubmit", myController.clozeSubmit)
router.post("/builder/ComprehensionSubmit", myController.comprehensionSubmit)


module.exports = router;