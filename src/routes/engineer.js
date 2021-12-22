const express = require("express");

const auth = require("../helpers/auth");

const controller = require("../controllers/engineer");
const authController = require("../controllers/auth");

const Router = express.Router();

Router.post("/register", controller.registerEngineer);
Router.post("/login", authController.login);

Router.get("/:id", auth.authentication, controller.getEngineerById);
Router.get("/", controller.getAllEngineer);

Router.post("/hire", controller.hireEngineer);

module.exports = Router;
