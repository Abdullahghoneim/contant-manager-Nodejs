const express = require('express');

const route = express.Router();

const Clients = require('../models/clients');

const isAuth = require('../middleware/is-auth');

route.get('/add-client', isAuth, (req, res) => {
  res.render('clients/add-client', {
    pageTitle: 'Add Clients',
    isAuth: req.session.isLoggedIn
  });
});

route.get('/:id', isAuth, (req, res) => {
  const clientId = req.params.id;
  Clients.findById({ _id: clientId })
    .then(result => {
      res.render('clients/clientDetails', {
        pageTitle: result.name,
        isAuth: req.session.isLoggedIn,
        clientDetails: result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

route.get('/', isAuth, (req, res) => {
  Clients.find({ userId: req.session.user._id }).then(client => {
    res.render('clients/clients', {
      pageTitle: 'Clients',
      isAuth: req.session.isLoggedIn,
      clients: client
    });
  });
});

route.post('/addClient', isAuth, (req, res) => {
  const { name, email, phone, balance } = req.body;
  const client = new Clients({
    name,
    email,
    phone,
    balance,
    userId: req.session.user._id
  });
  client
    .save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
});

route.post('/deleteClient', (req, res) => {
  const { clientId } = req.body;
  Clients.findOneAndDelete({ _id: clientId })
    .then(s => {
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

module.exports = route;
