const Task = require("../models/TaskSchema");

module.exports = async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      const data = await Task.find({ user: req.session.user });
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json("Error while fetching todo.");
    }
  } else {
    return res.redirect("/login");
  }
};
