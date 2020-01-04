const express = require('express');
const controller = require('../controllers/companyController');
const auth = require('../helper/auth');

const Router = express.Router();

Router.get('/', auth.checkToken, controller.getAllCompany);
// Router.get('/',  controller.getAllCompany);
Router.post('/', controller.postCompany);
Router.put('/:id_company', controller.putCompany);
Router.delete('/:id_company', controller.deleteCompany);


Router.post('/login', controller.loginCompany);
Router.post('/logincheck', controller.logincheck);


module.exports = Router;