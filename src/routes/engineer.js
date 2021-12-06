const express = require("express");

const auth = require("../helpers/auth");

const controller = require("../controllers/engineer");
const authController = require("../controllers/auth");

const Router = express.Router();

Router.post("/register", controller.registerEngineer);
Router.post("/login", authController.login);

Router.get("/:id", controller.getEngineerById);

module.exports = Router;
