const Task = require("../models/TaskSchema");

module.exports = async (req, res) => {
  if (req.session.isLoggedIn) {
    try {
      await Task.create({
        user: req.session.user,
        task: req.body.todo.replaceAll("\n", "").replaceAll("\r", ""),
        file: req.file.filename,
        completed: false,
      });
      return res.redirect("/");
    } catch (err) {
      console.log(err);
      return res.status(500).json("Error while adding task.");
    }
  } else {
    return res.redirect("/login");
  }
};
