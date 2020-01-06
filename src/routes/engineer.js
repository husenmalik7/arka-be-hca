const express = require('express');
const controller = require('../controllers/engineerController');
const auth = require('../helper/auth');

const Router = express.Router();



Router.get('/', controller.getAllEngineer); //auth for authorization
Router.post('/', controller.postEngineer);
Router.put('/:id_engineer', controller.putEngineer);
Router.delete('/:id_engineer', controller.deleteEngineer);
Router.get('/:id_engineer',  controller.getEngineerById);

Router.get('/:id_engineer/project',  controller.    );






// select * from engineer INNER join company on engineer.id_company = company.id_company where engineer.id_engineer = 60




module.exports = Router;