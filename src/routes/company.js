const express = require("express");
const controller = require("../controllers/company");

const Router = express.Router();

Router.get("/testGet", controller.testGet);

Router.get("/", controller.getAllCompany);
Router.get("/:id", controller.getCompanyById);
Router.post("/", controller.postCompany);
Router.put("/:id", controller.putCompany);

Router.post("/register", controller.registerCompany);
// Router.patch("/:id", controller.putCompany);

module.exports = Router;
