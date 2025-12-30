const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { validateSignup, handleValidation } = require('../middleware/validateMiddleware');
const router = express.Router();
router.post('/signup', validateSignup, handleValidation, registerUser);
router.post('/login', loginUser);
module.exports = router;