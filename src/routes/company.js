const express = require("express");

const auth = require("../helpers/auth");

const controller = require("../controllers/company");
const authController = require("../controllers/auth");

const Router = express.Router();

Router.get("/testGet", controller.testGet);

Router.get("/", controller.getAllCompany);
Router.get("/:id", auth.authentication, controller.getCompanyById);
Router.post("/", controller.postCompany);
Router.put("/:id", controller.putCompany);

Router.post("/register", controller.registerCompany);
Router.post("/login", authController.login);
// Router.patch("/:id", controller.putCompany);

module.exports = Router;
