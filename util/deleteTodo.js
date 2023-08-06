const fs = require("fs");
const getTodo = require("./getTodo");

const deleteTodo = (user, todo, callback) => {
  getTodo("all", (err, todoList) => {
    if (err) return callback(err);

    const listAfterDeletion = todoList.filter(
      (task) => !(task.task === todo && task.user === user)
    );

    fs.writeFile("./data.json", JSON.stringify(listAfterDeletion), (err) => {
      if (err) callback(err);
      callback();
    });
  });
};

module.exports = deleteTodo;
