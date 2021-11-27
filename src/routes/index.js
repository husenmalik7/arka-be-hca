const express = require("express");
const company = require("./company");
const engineer = require("./engineer");

const Router = express.Router();

Router.use("/company", company);
Router.use("/engineer", engineer);

module.exports = Router;
