const multer = require("multer");
const express = require("express");
const session = require("express-session");

const getTodo = require("./util/getTodo");
const addTodo = require("./util/addTodo");
const addUser = require("./util/addUser");
const deleteTodo = require("./util/deleteTodo");
const markPending = require("./util/markPending");
const authenticate = require("./util/authenticate");
const markCompleted = require("./util/markCompleted");

const app = express();

app.set("view engine", "ejs"); // view engine.
app.use(express.json()); // JSON data.
app.use(express.urlencoded({ extended: true })); // form data.
app.use(
  // session handling.
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(express.static(__dirname + "/public")); // static files.

// multer config:
const upload = multer({ dest: "uploads/" });
app.use(express.static("uploads"));
app.use(upload.single("file"));

// login route: - GET
app.get("/login", (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  return res.render("login", { error: false });
});

// login route: - POST
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  authenticate(username, password, (error, user) => {
    if (error) return res.status(500).send();
    if (user === undefined)
      return res.render("login", { error: "** Invalid username or password" });

    req.session.user = user;
    req.session.isLoggedIn = true;
    res.redirect("/");
  });
});

// register route: - GET
app.get("/register", (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  return res.render("register", { error: false });
});

// register route: - POST
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "")
    return res.render("register", {
      error: "** Both username and password are required!",
    });

  addUser(username, password, (err, exist) => {
    if (err) return res.status(500).send();
    if (exist)
      return res.render("register", { error: "** user already registered!" });
    // return res.render("login", { error: false });
    return res.redirect("/login");
  });
});

// logout route:
app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.render("login", { error: false });
});

// Home route:
app.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    getTodo(req.session.user, (err, todoList) => {
      if (err) res.status(500).send();
      return res.render(`todo`, { user: req.session.user });
    });
  } else {
    return res.render("login", { error: false });
  }
});

// get all todo route:
app.get("/fetchAllTodo", (req, res) => {
  if (req.session.isLoggedIn) {
    const user = req.session.user;
    getTodo(user, (err, data) => {
      if (err) {
        console.log("Error occured while fetching all todo.");
        return res.status(500).send();
      }

      return res.status(200).json(data);
    });
  } else {
    return res.redirect("/login");
  }
});

// add todo route:
app.post("/addTask", (req, res) => {
  const todo = {
    user: req.session.user,
    task: req.body.todo.replaceAll("\n", "").replaceAll("\r", ""),
    file: req.file.filename,
    completed: false,
  };

  if (req.session.isLoggedIn) {
    req.body.user = req.session.user;

    addTodo(todo, (err, todoList) => {
      if (err) {
        console.log("Error occured while adding task.");
        return res.status(500).send;
      }

      return res.redirect("/");
    });
  } else {
    return res.redirect("/login");
  }
});

// delete a todo route:
app.post("/deleteTask", (req, res) => {
  if (req.session.isLoggedIn) {
    deleteTodo(req.session.user, req.body.todo, (err) => {
      if (err) {
        console.log("Error occured while deleting task.");
        return res.status(500).send();
      }
      return res.status(200).send();
    });
  } else {
    return res.redirect("/login");
  }
});

// mark todo as completed route:
app.post("/markCompleted", (req, res) => {
  if (req.session.isLoggedIn) {
    markCompleted(req.session.user, req.body.todo, (err) => {
      if (err) {
        console.log("Error occured while marking task as completed.");
        return res.status(500).send();
      }
    });
    return res.status(200).send();
  } else {
    return res.redirect("/login");
  }
});

// mark todo as pending route:
app.post("/markPending", (req, res) => {
  if (req.session.isLoggedIn) {
    markPending(req.session.user, req.body.todo, (err) => {
      if (err) {
        console.log("Error occured while marking task as completed.");
        return res.status(500).send();
      }
    });
    return res.status(200).send();
  } else {
    return res.redirect("/login");
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
