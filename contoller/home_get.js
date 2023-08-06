module.exports = async (req, res) => {
  if (req.session.isLoggedIn) {
    return res.render(`todo`, { user: req.session.user });
  } else {
    return res.redirect("/login");
  }
};
