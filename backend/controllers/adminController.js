const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await User.countDocuments({});
    const users = await User.find({}).select('-password').limit(pageSize).skip(pageSize * (page - 1));
    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.status = req.body.status;
      await user.save();
      res.json({ message: 'Status updated' });
    } else { res.status(404).json({ message: 'User not found' }); }
  } catch (error) { res.status(500).json({ message: error.message }); }
};