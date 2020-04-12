var express = require("express");
var routes = require("./routes");
var cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log("Server listen port " + PORT);
});

// end
module.exports = app;
