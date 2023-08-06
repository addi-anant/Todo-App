const fs = require("fs");
const getTodo = require("./getTodo");

const markPending = (user, todo, callback) => {
  getTodo("all", (err, todoList) => {
    if (err) return callback(err);

    const updatedList = todoList.map((task) => {
      if (task.task === todo && task.user === user) {
        task.completed = false;
      }
      return task;
    });

    fs.writeFile("./data.json", JSON.stringify(updatedList), (err) => {
      if (err) return callback(err);
      callback();
    });
  });
};

module.exports = markPending;
