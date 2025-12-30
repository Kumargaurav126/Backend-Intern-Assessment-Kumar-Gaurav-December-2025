const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateProfileUpdate, handleValidation } = require('../middleware/validateMiddleware');
const router = express.Router();
router.route('/profile').get(protect, getUserProfile).put(protect, validateProfileUpdate, handleValidation, updateUserProfile);
module.exports = router;