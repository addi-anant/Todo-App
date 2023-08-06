const fs = require("fs");
const getTodo = require("./getTodo");

const markCompleted = (user, todo, callback) => {
  getTodo("all", (err, todoList) => {
    if (err) callback(err);

    updatedList = todoList.map((task) => {
      if (task.task === todo && task.user === user) {
        task.completed = true;
      }
      return task;
    });

    fs.writeFile("./data.json", JSON.stringify(updatedList), (err) => {
      if (err) callback(err);
      callback();
    });
  });
};

module.exports = markCompleted;
