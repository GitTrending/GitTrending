'use strict';
const passport = require("passport");
const _ = require('lodash');
const util = require('util');
const ip = require('ip');
const GitHubStrategy = require('passport-github2').Strategy;
var db = require("../models");
const authConfig = require('../config/auth.json');

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
let callBackURL, clientID, clientSecret;
if (process.env.NODE_ENV === 'production') {
  callBackURL = `https://radiant-river-28824.herokuapp.com/auth/github/callback`;
  clientID = `1cbf8693ea83c34c201c`;
  clientSecret = `345588a79215a59a8fc3d5f6a570a98c2ee2f5cd`;
  
} else {
  callBackURL = `http://127.0.0.1:8080/auth/github/callback`;
  clientID = `e2b7ceb4a9a59a9f5b70`;
  clientSecret = `81696e896ebf5dc7a47781c9a3bcf9470d2d9f14`;
}
passport.use(new GitHubStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callBackURL
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
