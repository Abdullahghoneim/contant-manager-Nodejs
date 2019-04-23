const express = require('express');
const route = express.Router();

const loginController = require('../controller/auth/login');
const signupController = require('../controller/auth/signup');
const logoutController = require('../controller/auth/logout');

// LOGIN GET AND POST

route.get('/login', loginController.getLogin);

route.post('/login', loginController.postLogin);

// SING UP GET AND POST

route.get('/signup', signupController.getSignUp);

route.post('/signup', signupController.postSignup);

// logout
route.get('/logout', logoutController.signout);

module.exports = route;
