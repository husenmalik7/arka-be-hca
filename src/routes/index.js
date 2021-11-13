const express = require("express");
const company = require("./company");

const Router = express.Router();

Router.use("/company", company);

module.exports = Router;
