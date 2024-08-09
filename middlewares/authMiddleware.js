const { Users, Tweets } = require("../models/models");

async function authMiddleware(req, res, next) {
  if (req.path === "/login") {
    next();
  } else {
    const user = await Users.findOne({
      where: { username: req.cookies["username"] },
      include: Tweets,
    });
    if (user && user.isLoggedin) {
      req.user = user;
      next();
    } else {
      res.redirect("/login");
    }
  }
}

module.exports = authMiddleware;
