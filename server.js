const express = require('express');
const body = require('body-parser');
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const htmlRouter = require('./routes/html-routes');
const app = express();
const db = require('./models');
// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.set("view engine", "handlebars");
app.use(body.urlencoded({ extended: false }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// Static directory
app.use(express.static(__dirname + "/views"));
app.use(htmlRouter);
app.use((req,res,next)=> {
	res.status(404).render('404');
});
// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>  {
    console.log("App listening on PORT " + PORT);
  });
});