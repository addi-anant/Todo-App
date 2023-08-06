const Auth = require("../models/AuthSchema");

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "")
    return res.render("register", {
      error: "** Both username and password are required!",
    });

  try {
    // check if user already exist.
    const exist = await Auth.findOne({
      username: username,
      password: password,
    });

    console.log(exist);

    // user already exists:
    if (exist) {
      return res.render("register", { error: "** user already registered!" });
    }

    // create new user:
    await Auth.create({
      username: username,
      password: password,
    });

    return res.redirect("/login");
  } catch (err) {
    console.log(err);
    return res.status(500).json("Error While Registeration.");
  }
};
