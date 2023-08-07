const express = require("express");
const router = express.Router();
const myController = require("../Controller/myController");


router.post("/builder/CategorizeSubmit", myController.categorizeSubmit)
router.post("/builder/ClozeSubmit", myController.clozeSubmit)
router.post("/builder/ComprehensionSubmit", myController.comprehensionSubmit)


router.get("/quiz/CategorizeQuestion", myController.categorizeQuestion)
router.get("/quiz/ClozeQuestion", myController.clozeQuestion)
router.get("/quiz/ComprehensionQuestion", myController.comprehensionQuestion)

module.exports = router;