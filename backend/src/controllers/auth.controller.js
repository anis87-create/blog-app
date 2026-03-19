const crypto = require('crypto');
const User = require('../models/User');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { success, error } = require('../utils/response');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return error(res, 'Email already registered', 400);

    const user = await User.create({ name, email, password, isVerified: true });
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    return success(res, { user: user.toSafeObject(), accessToken }, 'Registered successfully', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password +refreshToken');
    if (!user || !(await user.comparePassword(password))) {
      return error(res, 'Invalid credentials', 401);
    }

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    return success(res, { user: user.toSafeObject(), accessToken }, 'Logged in');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return error(res, 'No refresh token', 401);

    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.id).select('+refreshToken');
    if (!user || user.refreshToken !== token) return error(res, 'Invalid token', 401);

    const accessToken = signAccessToken(user._id);
    const newRefreshToken = signRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
    return success(res, { accessToken });
  } catch (err) {
    return error(res, 'Invalid or expired token', 401);
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const user = await User.findOne({ refreshToken: token }).select('+refreshToken');
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }
    res.clearCookie('refreshToken');
    return success(res, {}, 'Logged out');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return error(res, 'No account found with this email', 404);
    if (user.provider !== 'local') return error(res, 'This account uses OAuth login', 400);

    // Generate a random token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // TODO: In production, send this link by email instead of returning it
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;
    return success(res, { resetLink }, 'Reset link generated');
  } catch (err) {
    return error(res, err.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return error(res, 'Token and new password are required', 400);

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpires');

    if (!user) return error(res, 'Invalid or expired reset token', 400);

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return success(res, {}, 'Password reset successfully');
  } catch (err) {
    return error(res, err.message);
  }
};

// Called after Passport OAuth success
exports.oauthCallback = (req, res) => {
  try {
    const user = req.user;
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    User.findByIdAndUpdate(user._id, { refreshToken }).exec();
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);

    // Redirect frontend with token in query (frontend reads it then removes from URL)
    res.redirect(`${process.env.CLIENT_URL}/oauth-callback?token=${accessToken}`);
  } catch (err) {
    res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
  }
};
