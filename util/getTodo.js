const fs = require("fs");

const getTodo = (user, callback) => {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) callback(err);

    if (data.length === 0) data = "[]";
    try {
      if (user === "all") {
        callback(null, JSON.parse(data));
        return;
      }

      const parsedData = JSON.parse(data);
      const filteredData = parsedData.filter((todo) => todo.user === user);
      callback(null, filteredData);
    } catch (err) {
      callback(err, null);
    }
  });
};

module.exports = getTodo;
