const express = require("express");
const controller = require("../controllers/engineer");

const Router = express.Router();

Router.post("/register", controller.registerEngineer);

module.exports = Router;
