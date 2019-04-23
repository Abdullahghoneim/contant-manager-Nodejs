const express = require('express');

const route = express.Router();

const isAuth = require('../middleware/is-auth');

route.get('/', isAuth, (req, res) => {
  res.render('clients/clients', {
    pageTitle: 'Clients',
    isAuth: req.session.isLoggedIn
  });
});

module.exports = route;
