'use strict';
const express = require('express');

const session = require('express-session');
const methodOverride = require('method-override');

const body = require('body-parser');
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const htmlRouter = require('./routes/html-routes');
const apiRouter = require('./routes/api-routes');
const app = express();
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(body.json());
app.use(body.text());
app.use(body.json({ type: "application/vnd.api+json" }));
app.set("view engine", "handlebars");
app.use(body.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

// Static directory





app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
const passport = require('./controller/passport.config.js');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/views"));

app.use(htmlRouter);
app.use(apiRouter);
app.use((req,res,next)=> {
  res.status(404).render('404');
});

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>  {
    
    db.user.findOne( {where: {id:3}, include: [db.repo]})
    .then(data=> console.log(">>>>", data.toJSON()))

    console.log("App listening on PORT " + PORT);
  });
});
