const express = require("express");

const auth = require("../helpers/auth");

const controller = require("../controllers/project");

const Router = express.Router();

Router.put("/done", controller.finishTheProject);
Router.post("/add", controller.addProject);
Router.put("/dismiss", controller.dismissEngineer);

module.exports = Router;
