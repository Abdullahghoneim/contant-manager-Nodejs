exports.signout = (req, res) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/login');
  });
};
