const express = require('express');
const router = express.Router();
const automationController = require('../controller/run-internshala');

router.post('/run-internshala', automationController.runInternshalaAutomation);

module.exports = router;