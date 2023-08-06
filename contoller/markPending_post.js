const Task = require("../models/TaskSchema");

module.exports = async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      await Task.updateOne({ _id: req.body.id }, { completed: false });
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error while marking as pending todo.");
    }
  } else {
    return res.redirect("/login");
  }
};
