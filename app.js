const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);

const authRoute = require('./routes/auth');
const clientRoute = require('./routes/clients');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/contant-manager';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(bodyParser.urlencoded({ urlencoded: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// sessios
app.use(
  expressSession({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(authRoute);
app.use(clientRoute);

mongoose
  .connect(MONGODB_URI)
  .then(res => {
    app.listen(3000);
  })
  .catch(err => {
    console.log('unable to connect to database ');
  });
