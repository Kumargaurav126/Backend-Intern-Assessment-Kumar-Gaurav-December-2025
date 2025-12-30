const { check, validationResult } = require('express-validator');

const validateSignup = [
  check('fullName', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];

const validateProfileUpdate = [
  check('email', 'Please include a valid email').optional().isEmail(),
  check('password', 'Password must be 6 or more characters').optional().isLength({ min: 6 })
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};
module.exports = { validateSignup, validateProfileUpdate, handleValidation };