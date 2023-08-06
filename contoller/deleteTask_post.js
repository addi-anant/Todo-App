const Task = require("../models/TaskSchema");

module.exports = async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      await Task.deleteOne({ _id: req.body.id });
      return res.status(200).send();
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error while deleting todo.");
    }
  } else {
    return res.redirect("/login");
  }
};
