const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if(user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
};

exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id, fullName: updatedUser.fullName, email: updatedUser.email,
      role: updatedUser.role, token: req.headers.authorization.split(' ')[1]
    });
  } else { res.status(404).json({ message: 'User not found' }); }
};