const multer = require("multer");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

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
require("dotenv").config(); // dotenv

// multer config:
const upload = multer({ dest: "uploads/" });
app.use(express.static("uploads"));
app.use(upload.single("file"));

// MongoDB Connection:
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Successfully Connection to the MongoDB Database."))
  .catch((error) => console.log(error));

// login route: - GET
app.get("/login", require("./contoller/login_get"));

// login route: - POST
app.post("/login", require("./contoller/login_post"));

// register route: - GET
app.get("/register", require("./contoller/register_get"));

// register route: - POST
app.post("/register", require("./contoller/register_post"));

// logout route:
app.get("/logout", require("./contoller/logout_get.js"));

// Home route:
app.get("/", require("./contoller/home_get.js"));

// get all todo route:
app.get("/fetchAllTodo", require("./contoller/fetchAllTodo_get.js"));

// add todo route:
app.post("/addTask", require("./contoller/addTask_post.js"));

// delete a todo route:
app.post("/deleteTask", require("./contoller/deleteTask_post.js"));

// mark todo as completed route:
app.post("/markCompleted", require("./contoller/markCompleted_post.js"));

// mark todo as pending route:
app.post("/markPending", require("./contoller/markPending_post.js"));

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
