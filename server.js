'use strict';
const express = require('express');
const passport = require('passport');
const util = require('util');
const session = require('express-session');
const methodOverride = require('method-override');
const GitHubStrategy = require('passport-github2').Strategy;
const body = require('body-parser');
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const htmlRouter = require('./routes/html-routes');
const app = express();
const db = require('./models');
const authConfig = require('./config/auth.json');
console.log("athConfig is>>>", authConfig);
// Sets up the Express app to handle data parsing
app.use(body.json());
app.use(body.text());
app.use(body.json({ type: "application/vnd.api+json" }));
app.set("view engine", "handlebars");
app.use(body.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Static directory
app.use(express.static(__dirname + "/views"));
app.use(htmlRouter);
/*
app.use((req,res,next)=> {
	res.status(404).render('404');
});
*/
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

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
    done(null, user);
  })
});


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
    console.log("profile.id is >>>>", profile.id);
    return db.user.findOne({where:{github_id:profile.id}})
    .then(data=>{
      console.log("data is>>>>", data);
      if (data) {
        return done(null,data);
      } else {
        return db.user.build({ github_id: profile.id }).save()
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


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('404', { });
});

app.get('/login', function(req, res){
  res.render('trending');
});

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("here in callback>>>");
    console.log("req.user is>>>>", req.user);
    res.json("you have successfully logged in!");
    //res.redirect('/account');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>  {
    /*
    db.keyword.findAll( {include: [db.repo]})
    .then(data=> console.log(">>>>", data[0].toJSON()))
    */
    console.log("App listening on PORT " + PORT);

  });
});
