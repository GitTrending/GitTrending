const passport = require("passport");
const _ = require('lodash');
const util = require('util');
const GitHubStrategy = require('passport-github2').Strategy;
var db = require("../models");
const authConfig = require('../config/auth.json');

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: authConfig.GITHUB_CLIENT_ID,
    clientSecret: authConfig.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    console.log("profile is >>>>", profile)
    return db.user.findOne({where:{github_id:profile.id}})
    .then(data=>{
      if (data) {
        return done(null,data);
      } else {
        return db.user.build({ 
          github_id: profile.id,
          displayName: profile.displayName,
          username: profile.username,
          profileUrl: profile.profileUrl,
          email: _.get(profile, ['emails', 0, 'value'], null)
        }).save()
        .then(()=>{
          return db.user.findOne({where:{github_id:profile.id}})
        })
        .then(data=>{
          return done(null,data);
        })
      }
    });
  }
));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing
passport.serializeUser(function(user, done) {
  console.log("serialize>>>>>", user.github_id);
  done(null, user.github_id);
});

passport.deserializeUser(function(id, done) {
  console.log("deserialize>>>>", id);
  db.user.findOne({where:{github_id: id}})
  .then(user=>{
    done(null, user.toJSON());
  })
});

module.exports = passport;
