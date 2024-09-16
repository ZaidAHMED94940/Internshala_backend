const express = require('express');
const router = express.Router();
const educationController = require('../controller/educationController.js');

router.post('/', educationController.createProfile);
router.get('/', educationController.getProfiles);
router.get('/:email', educationController.getProfileByemail);
router.put('/:id', educationController.updateProfile);
router.delete('/:id', educationController.deleteProfile);

module.exports = router;
