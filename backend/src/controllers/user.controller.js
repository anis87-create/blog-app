const User = require('../models/User');
const { success, error } = require('../utils/response');

exports.getMe = async (req, res) => {
  return success(res, { user: req.user });
};

exports.updateMe = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    );
    return success(res, { user });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (user.provider !== 'local') return error(res, 'Social auth users cannot change password', 400);
    if (!(await user.comparePassword(currentPassword))) return error(res, 'Wrong current password', 400);

    user.password = newPassword;
    await user.save();
    return success(res, {}, 'Password changed');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name avatar role createdAt');
    if (!user) return error(res, 'User not found', 404);
    return success(res, { user });
  } catch (err) {
    return error(res, err.message);
  }
};

// Admin
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().sort('-createdAt');
    return success(res, { users });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.updateRole = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );
    if (!user) return error(res, 'User not found', 404);
    return success(res, { user });
  } catch (err) {
    return error(res, err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return success(res, {}, 'User deleted');
  } catch (err) {
    return error(res, err.message);
  }
};
