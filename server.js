
const express = require("express");
const path = require("path");

const app = express();
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let users = [
  {
    username: "test@test.com",
    password: "123456",
    isLoggedin: false,
  },
];

app.locals.startedAt = new Date();
app.set("test-setting", "settings-val");

function authMiddleware(req, res, next) {
  if (req.path==="/login"){
    next();
  }else{
    let user = users.find((elm) => elm.username === req.cookies["username"]);
    if (user && user.isLoggedin) {
      next();
    } else {
      res.redirect("/login")
    }
  }

}

app.use(authMiddleware);

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.post("/login", (req, res) => {
  let success = false;
  users.forEach((elm, idx) => {
    if (
      elm.username == req.body["username"] &&
      elm.password === req.body["password"]
    ) {
      users[idx].isLoggedin = true;
      success = true;
    }
  });
  if (!success) {
    res.redirect("/login");
  } else {
    res.cookie("username", req.body["username"], {
      maxAge: 1000 * 3600 * 48,
      httpOnly: true,
    });
    res.redirect("/home");
  }
});

app.get("/:lang/home", (req, res) => {
  const pageLang = req.params.lang;
  switch (pageLang) {
    case "fr":
      res.sendFile(path.join(__dirname, "/views/home-fr.html"));
      break;
    case "es":
      res.sendFile(path.join(__dirname, "/views/home-es.html"));
      break;
    default:
      res.sendFile(path.join(__dirname, "/views/home.html"));
      break;
  }
});

app.get("/home", (req, res) => {
  const pageLang = req.query.language;
  switch (pageLang) {
    case "fr":
      res.sendFile(path.join(__dirname, "/views/home-fr.html"));
      break;
    case "es":
      res.sendFile(path.join(__dirname, "/views/home-es.html"));
      break;
    default:
      res.sendFile(path.join(__dirname, "/views/home.html"));
      break;
  }
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/profile.html"));
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
