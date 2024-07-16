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

// app.use(authMiddleware);

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
  // const pageLang = req.query.language;
  // switch (pageLang) {
  //   case "fr":
  //     res.sendFile(path.join(__dirname, "/views/home-fr.html"));
  //     break;
  //   case "es":
  //     res.sendFile(path.join(__dirname, "/views/home-es.html"));
  //     break;
  //   default:
  //     res.sendFile(path.join(__dirname, "/views/home.html"));
  //     break;
  // }
  let userTweets = req.user.tweets;
  let dynamicTweets = "";
  for (let index = 0; index < userTweets.length; index++) {
    const tweetData = userTweets[index];
    let tweet = `
     <!-- Tweet card -->
        <div class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
          <div class="flex">
            <div class="flex-shrink-0">
              <img
                src="https://via.placeholder.com/50"
                alt="User avatar"
                class="w-10 h-10 rounded-full"
              />
            </div>
            <div class="ml-2">
              <h2 class="text-lg font-semibold">${
                req.user.firstName + " " + req.user.lastName
              }</h2>
              <p class="text-gray-600">@${req.user.username} &middot; ${
      tweetData.timeStamp
    }</p>
            </div>
          </div>
          <p class="mt-2 text-gray-800">
            ${tweetData.tweetContent}
          </p>
          <div class="mt-4 flex justify-between items-center">
            <div class="flex flex-col">
              <button class="text-gray-600 hover:text-blue-500 mr-4">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
                20
              </button>
              <button class="text-gray-600 hover:text-blue-500">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
            <button class="text-gray-600 hover:text-blue-500">Comment</button>
          </div>
        </div>
    `;
    dynamicTweets += tweet;
  }
  res.send(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chirper Home</title>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="bg-gray-100">
    <!-- Navigation bar -->
    <nav class="bg-white border-b border-gray-200 p-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex-shrink-0">
          <a href="#" class="text-xl font-bold text-blue-500">Chirper</a>
        </div>
        <div class="flex">
          <a href="#" class="text-gray-600 hover:text-blue-500 mr-4 border-b border-blue-500">Home</a>
          <a href="#" class="text-gray-600 hover:text-blue-500 mr-4">Explore</a>
          <a href="#" class="text-gray-600 hover:text-blue-500 mr-4"
            >Notifications</a
          >
          <a href="#" class="text-gray-600 hover:text-blue-500 mr-4"
            >Messages</a
          >
        </div>
        <div
          class="flex items-center border border-gray-200 rounded-full hover:bg-grey-600"
        >
          <a href="#" class="text-gray-600 hover:text-blue-500">
            <img
              src="https://via.placeholder.com/50"
              alt="User avatar"
              class="w-10 h-10 rounded-full m-2"
          /></a>
        </div>
      </div>
    </nav>

    <!-- Main content area -->
    <main class="max-w-7xl mx-auto mt-4">
      <!-- Compose tweet form -->
      <section
        class="bg-white border border-gray-200 p-4 rounded-lg shadow-sm mb-4"
      >
        <form action="#" method="POST">
          <textarea
            id="tweetContent"
            name="tweetContent"
            rows="3"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="What's happening?"
          ></textarea>
          <div class="flex justify-end items-center mt-2">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none"
            >
              Tweet
            </button>
          </div>
        </form>
      </section>
      <!-- Tweets -->
      <section class="grid grid-cols-1 gap-4">
       ${dynamicTweets}
      </section>
    </main>
  </body>
</html>

    `);
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/profile.html"));
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
