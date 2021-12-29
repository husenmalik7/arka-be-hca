const express = require("express");
const company = require("./company");
const engineer = require("./engineer");
const project = require("./project");

const Router = express.Router();

Router.use("/company", company);
Router.use("/engineer", engineer);
Router.use("/project", project);

module.exports = Router;
