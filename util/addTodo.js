const fs = require("fs");
const getTodo = require("./getTodo");

const addTodo = (todo, callback) => {
  getTodo("all", (err, todoList) => {
    /* todoList will be an array of objects. */
    if (err) return callback(err);

    todoList.push(todo);
    fs.writeFile("./data.json", JSON.stringify(todoList), (err) => {
      if (err) return callback(err);
      callback(null, todoList);
    });
  });
};

module.exports = addTodo;
