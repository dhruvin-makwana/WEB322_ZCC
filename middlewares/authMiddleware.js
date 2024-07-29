export default function authMiddleware(req, res, next) {
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