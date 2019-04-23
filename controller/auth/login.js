var bcrypt = require('bcryptjs');
const User = require('../../models/user');

// Login
exports.getLogin = (req, res) => {
  res.render('auth/login', {
    pageTitle: 'login',
    isAuth: false
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (!doMatch) {
            return res.redirect('/login');
          }
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        })
        .catch(err => {
          // unabele to compare
          console.log(err);
        });
    })
    .catch(err => {
      //   unable to fetch user from database
      console.log(err);
    });
};
