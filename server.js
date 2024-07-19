const express = require("express");
const path = require("path");

const app = express();
app.set("view engine", "ejs");

var cookieParser = require("cookie-parser");
const { randomInt } = require("crypto");
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let users = [
  {
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    email: "test@test.com",
    password: "123456",
    profileImage: "https://placehold.co/300?text=T",
    isLoggedin: false,
    isVerified:true,
    tweets: [
      {
        tweetContent: "Test tweet one",
        timeStamp: "2024-07-15",
      },
      {
        tweetContent: "Test tweet two",
        timeStamp: "2024-07-12",
      },
      {
        tweetContent: "Test tweet three",
        timeStamp: "2024-07-01",
      },
      {
        tweetContent: "Test tweet Four",
        timeStamp: "2024-07-01",
      },
    ],
  },
  {
    username: "dummyuser",
    firstName: "Dummy",
    lastName: "User",
    email: "dummyuser@test.com",
    password: "654321",
    profileImage: "https://placehold.co/300?text=D",
    isLoggedin: false,
    tweets: [
      {
        tweetContent: "Dummy tweet one",
        timeStamp: "2024-07-15",
      },
      {
        tweetContent: "Dummy tweet two",
        timeStamp: "2024-07-12",
      },
      {
        tweetContent: "Dummy tweet three",
        timeStamp: "2024-07-01",
      },
    ],
  },
];

app.locals.startedAt = new Date();
app.set("test-setting", "settings-val");

function authMiddleware(req, res, next) {
  if (req.path === "/login") {
    next();
  } else {
    let user = users.find((elm) => elm.username === req.cookies["username"]);
    if (user && user.isLoggedin) {
      req.user = user;
      next();
    } else {
      res.redirect("/login");
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
  res.render('viewData',{
    route:"/home",
    name: `${req.user.firstName} ${req.user.lastName}`,
    username: req.user.username,
    tweets:req.user.tweets,
    isVerified:req.user.isVerified
  })
});

app.get("/profile", (req, res) => {
  res.render('viewData',{
    route:"/profile",
  })
});
app.get("/explore", (req, res) => {
  res.render('viewData',{
    route:"/explore",
  })
});
app.get("/notifications", (req, res) => {
  res.render('viewData',{
    route:"/notifications",
  })
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
      snippet:"<p>Hello</p>",
      items:["item1", "item2", "item3"]
    },
  });
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
