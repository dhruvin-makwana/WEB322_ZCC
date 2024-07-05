const express = require("express");
const path = require("path");

const app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.locals.startedAt = new Date();
app.set("test-setting", "settings-val");

let users = [
  {
    username: "test@test.com",
    password: "123456",
    isLoggedin: false,
  },
];


app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/home", (req, res) => {
  let user = users.find((elm) => elm.username === req.cookies["username"]);
  if (user && user.isLoggedin) {
    res.sendFile(path.join(__dirname, "/views/home.html"));
  } else {
    res.redirect("/login");
  }
});

app.post("/login", (req, res) => {
  let success = false;
  users.forEach((elm, idx) => {
    if (
      elm.username == req.body["username"] &&
      elm.password === req.body["password"]
    ) {
      users[idx].isLoggedin = true;
      success=true
    }
  });
  if (!success) {
    res.redirect("/login");
  }else{
    res.cookie("username",req.body["username"])
    res.redirect("/home");
  }
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
