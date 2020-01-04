const express = require('express');
const controller = require('../controllers/userController');
const auth = require('../helper/auth');
const jwt = require('jsonwebtoken')


const Router = express.Router();


Router.post('/login', controller.loginUser);
Router.post('/register', controller.registerUser);




module.exports = Router;