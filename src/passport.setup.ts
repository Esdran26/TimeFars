import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {authCtrl} from './controllers/router/auth.controller';

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (id: any, done) {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4002/auth/google/callback',
    },
    async function (token: any, tokenSecret: any, profile: any, done: any) {
      try {
        profile = await authCtrl(profile, profile._json.sub);
        done(null, profile);
      } catch (e) {
        done(e, profile);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: 'http://localhost:4002/auth/facebook/callback',
      profileFields: ['emails', 'displayName'],
    },
    async function (accessToken, refreshToken, profile: any, done) {
      try {
        profile = await authCtrl(profile, profile._json.id);
        done(null, profile);
      } catch (e) {
        done(e, profile);
      }
    }
  )
);
