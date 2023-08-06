const getAuth = require("./getAuth");

const authenticate = (username, password, callback) => {
  getAuth((err, data) => {
    if (err) callback(err);

    const found = data.filter(
      (detail) => detail.username === username && detail.password === password
    );

    if (found.length !== 1) {
      callback(null, undefined);
      return;
    }
    callback(null, found[0].username);
  });
};

module.exports = authenticate;
