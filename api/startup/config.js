const cors = require("cors");
const cookieParser = require("cookie-parser");

module.exports = function (app, express) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(express.static("public"));

  app.use(express.urlencoded());

  app.use(cookieParser());
};
