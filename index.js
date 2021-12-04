const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const routes = require("./src/routes/index");
app.use("/", routes);

app.listen(port, () => {
  console.log("your server started on " + port);
});

module.exports = app;
