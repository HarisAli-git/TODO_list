const express = require('express');
const router = express.Router();

const LabelsController = require('../controller/LabelController');

router.get("/", LabelsController.labels_get_all);

router.post("/addLabel", LabelsController.labels_add_label);

module.exports = router;