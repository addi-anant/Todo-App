const fs = require("fs");
const getAuth = require("./getAuth");

const addUser = (username, password, callback) => {
  getAuth((err, data) => {
    if (err) {
      callback(err, false);
      return;
    }

    const found = data.filter((detail) => detail.username === username);

    /* user already exist. */
    if (found.length === 1) {
      callback(err, true);
      return;
    }

    data.push({ username: username, password: password });
    fs.writeFile("./auth.txt", JSON.stringify(data), (err) => {
      if (err) {
        callback(err, false);
        return;
      }

      callback(null, false);
    });
  });
};

module.exports = addUser;
