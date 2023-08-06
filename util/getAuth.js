const fs = require("fs");

const getAuth = (callback) => {
  fs.readFile("auth.txt", "utf8", (err, data) => {
    if (err) callback(err);

    if (data.length === 0) data = "[]";
    try {
      callback(null, JSON.parse(data));
    } catch (err) {
      callback(err);
    }
  });
};

module.exports = getAuth;
