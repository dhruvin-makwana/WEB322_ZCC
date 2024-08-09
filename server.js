const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
const { randomInt } = require("crypto");
const { Users, tweets, initDB } = require("./models/models");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authMiddleware);

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.post("/login", async (req, res) => {
  let user = await Users.findOne({
    where: { username: req.body["username"], password: req.body["password"] },
    include: tweets,
  });

  if (!user) {
    res.redirect("/login");
  } else {
    user.isLoggedin = true;
    await user.save();
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
  res.render("viewData", {
    route: "/home",
    name: `${req.user.firstName} ${req.user.lastName}`,
    username: req.user.username,
    tweets: req.user.Tweets,
    isVerified: req.user.isVerified,
  });
});

app.get("/profile", (req, res) => {
  res.render("viewData", {
    route: "/profile",
  });
});
app.get("/explore", (req, res) => {
  res.render("viewData", {
    route: "/explore",
  });
});
app.get("/notifications", (req, res) => {
  res.render("viewData", {
    route: "/notifications",
  });
});

app.get("/api/profile", (req, res) => {
  if (req.user) {
    res.json({
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      profileImage: req.user.profileImage,
    });
  }
});

app.get("/temp", (req, res) => {
  let number = randomInt(1000);
  console.log(number);
  res.render("temp", {
    data: {
      randomNumber: number,
      snippet: "<p>Hello</p>",
      items: ["item1", "item2", "item3"],
    },
  });
});

initDB().then(() => {
  console.log("Database initialized!!");
  app.listen(8080, () => {
    console.log("Server started on port 8080"); // This line is not covered by the test
  });
});
