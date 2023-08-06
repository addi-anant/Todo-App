const Auth = require("../models/AuthSchema");

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await Auth.findOne({ username: username, password: password });

    // no user found:
    if (!user) {
      return res.render("login", { error: "** Invalid username or password" });
    }

    // user found:
    req.session.user = user.username;
    req.session.isLoggedIn = true;
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).json("Error while login");
  }
};
