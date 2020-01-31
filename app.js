var express = require("express");
var path = require("path");
var connectDB = require("./config/db");
require("dotenv").config();

var app = express();

//Connect DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

//Define Routes
app.use("/fonts", require("./routes/fonts"));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/favs", require("./routes/favs"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
