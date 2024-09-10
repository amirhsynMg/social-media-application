const express = require("express");
const app = express();



// importing routes
const router = require("./src/routes/index");

// middlewares
require("./startup/config")(app, express);

// starting the database
require("./startup/db")();

// error handling for outside of the router :)
require("./startup/logging")();

// handling routers
app.use("/api", router);

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log("app started on port " + port);
});
 
