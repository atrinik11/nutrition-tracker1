const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8001;
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

let MONGO_URL;
const MONGO_LOCAL_URL = "mongodb://localhost:27017/nutrition-tracker1";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
  MONGO_URL = process.env.MONGODB_URI;
} else {
  mongoose.connect(MONGO_LOCAL_URL);
  MONGO_URL = MONGO_LOCAL_URL;
}

const db = mongoose.connection;
db.on("error", err => {
  console.log(`There was an error connecting to the database: ${err}`);
});
db.once("open", () => {
  console.log(
    `You have successfully connected to your mongo database: ${MONGO_URL}`
  );
});

//Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, function() {
  console.log(`Server is now on PORT ${PORT}!`);
});
