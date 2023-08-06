module.exports = (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  return res.render("login", { error: false });
};
