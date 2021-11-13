const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require("./src/routes/index");
app.use("/", routes);

app.listen(port, () => {
  console.log("your server started on " + port);
});

module.exports = app;
