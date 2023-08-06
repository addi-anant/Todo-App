const Task = require("../models/TaskSchema");

module.exports = async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      await Task.updateOne({ _id: req.body.id }, { completed: true });
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error while marking as completed todo.");
    }
  } else {
    return res.redirect("/login");
  }
};
