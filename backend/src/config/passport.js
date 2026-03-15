const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

// JWT Strategy
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id).select('-password -refreshToken');
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

// Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'google' });
      if (!user) {
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          user.provider = 'google';
          user.providerId = profile.id;
          if (!user.avatar) user.avatar = profile.photos[0]?.value;
          await user.save();
        } else {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0]?.value,
            provider: 'google',
            providerId: profile.id,
            isVerified: true,
          });
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails', 'photos'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
      if (!user) {
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });
        }
        if (user) {
          user.provider = 'facebook';
          user.providerId = profile.id;
          if (!user.avatar) user.avatar = profile.photos?.[0]?.value;
          await user.save();
        } else {
          user = await User.create({
            name: profile.displayName,
            email: email || `fb_${profile.id}@placeholder.com`,
            avatar: profile.photos?.[0]?.value,
            provider: 'facebook',
            providerId: profile.id,
            isVerified: true,
          });
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));
