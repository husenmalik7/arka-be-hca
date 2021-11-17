const express = require("express");
const company = require("./company");
const engineer = require("./engineer");
const user = require("./user");

const Router = express.Router();

Router.use("/company", company);
Router.use("/engineer", engineer);
Router.use("/user", user);

module.exports = Router;
