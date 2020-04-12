var express = require("express");
var routes = require("./routes");
var cors = require("cors");

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

app.listen(3001, function () {
  console.log("Server listen port 3001!");
});

// end
module.exports = app;
