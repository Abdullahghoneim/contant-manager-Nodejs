var bcrypt = require('bcryptjs');
const User = require('../../models/user');

exports.getSignUp = (req, res) => {
  res.render('auth/signup', {
    pageTitle: 'signup',
    isAuth: false
  });
};

exports.postSignup = (req, res) => {
  const { name, email, password, company } = req.body;
  let seveduser;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.redirect('/signup');
      }
      bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
            company
          });
          user.save();
          seveduser = user;
        })
        .then(() => {
          req.session.isLoggedIn = true;
          req.session.user = seveduser;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        })
        .catch(err => {
          console.log('unable to hash password');
        });
    })
    .catch(err => {
      console.log(err);
    });
};
